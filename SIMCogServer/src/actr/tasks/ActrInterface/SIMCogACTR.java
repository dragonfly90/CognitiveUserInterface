package actr.tasks.ActrInterface;

import actr.task.NamedColor;
import actr.task.Task;
import actr.task.TaskCross;
import actr.task.TaskLabel;
import actr.task.TaskLine;
import actr.task.TaskOval;
import actr.task.TaskOvalBorder;
import actr.task.TaskOvalBorderFilled;
import actr.task.TaskRectangle;
import actr.task.TaskRectangleBorder;
import actr.task.TaskRectangleBorderFilled;
import actr.task.irrelevant.visuals.TaskIrrelevantBox;
import actr.task.irrelevant.visuals.TaskIrrelevantLabel;
import actr.task.irrelevant.visuals.TaskIrrelevantLine;
import actr.model.Motor.Point;
import actr.model.Symbol;

import java.io.FileNotFoundException;
import java.net.UnknownHostException;
import java.nio.channels.ClosedByInterruptException;
import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

import org.java_websocket.drafts.Draft_17;

import com.thetransactioncompany.jsonrpc2.JSONRPC2Error;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import com.thetransactioncompany.jsonrpc2.server.MessageContext;
import com.thetransactioncompany.jsonrpc2.server.RequestHandler;

/**
 * Central task class. This is what is modifying what the model is seeing
 * handles requests from client to do so
 * 
 * to start server add this to commands list and hit play
 */
// (set-task "actr.tasks.ActrInterface.SIMCogACTR")
public class SIMCogACTR extends Task implements RequestHandler {

	private static final long serialVersionUID = 1L;
	ACTRRemoteTaskServer server;

	// output occurred messages will be used in log files here.
	private ArrayList<String> outList = new ArrayList<String>();

	public static Boolean logData = false; // if false then no data is logged,
											// if true
	// then
	// data is logged. Accepts this from client.
	// (Top of SimCog.js
	private Boolean debugInitServerMsg;
	private Boolean debugUpdateMsg;
	public static ModelDataLogger dataLogger;

	public long initTime;// Initial Unix timestamp. this is based on the
							// task timer not the model.
	public long currentTaskTime; // Most recent time given by the
									// environment.

	// ArrayList of clickable objects that is used whenever the model performs
	// click
	public static ArrayList<VisualObject> clickAbleItems = new ArrayList<VisualObject>();

	// Color map , CSS Color names to NamedColors
	public static Map<String, NamedColor> colorMap = new Hashtable<String, NamedColor>();

	/**
	 * Storage map of String Unique IDs to Task components. ie TaskLabel
	 * TaskRectangle etc. storage center for all screen components.
	 */
	public static Map<String, Object> storageMap = new Hashtable<String, Object>();

	public SIMCogACTR() {
		super();
	}

	/**
	 * called on task startup to initialize connection
	 */
	public void start() {
		if (server == null) {
			try {
				server = new ACTRRemoteTaskServer(9003, new Draft_17(), this);
				server.start();
			} catch (UnknownHostException e) {
				e.printStackTrace();
			}
		}

		this.output("Waiting on client");
		populateColors();
		// this.addPeriodicUpdate(0.1f);
	}

	public void finish() {

		try {
			server.closeConnection();
		} catch (ClosedByInterruptException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		output("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
		server.doOnClose();
		super.finish();

	}

	/**
	 * Stops server, called by exit request.
	 */
	void stopRemoteTaskServer() {
		this.output("Server Exiting");
	}

	/**
	 * List of supported requests. If you want to add a request it MUST be
	 * included here as well as within the process method
	 */
	public String[] handledRequests() {
		return new String[] { "update", "exit", "init", "deleteObjects",
				"runCommand" };
	}

	/**
	 * Dispatches handlers for JSONRPC requests.
	 */
	public JSONRPC2Response process(JSONRPC2Request req, MessageContext ctx) {
		if (req.getMethod().equals("update")) {
			if (this.debugUpdateMsg) {
				output(req.toString());
			}
			List<Object> params = (List<Object>) req.getPositionalParams();
			currentTaskTime = Long.parseLong((String) params.get(0).toString());

			ArrayList<VisualObject> visObjects = new ArrayList<VisualObject>();
			convertToVisObjects(visObjects, params);
			cycleVisObjectsListToMap(visObjects);

			processDisplayNoClear();
			if (logData) {
				String outListString;
				try {
					outListString = outList.toString();
				} catch (ConcurrentModificationException e) {
					outListString = "concurrent error";
				}
				outList = new ArrayList<String>();

				dataLogger
						.writeUpdateInfo(currentTaskTime, this, outListString);
			}
			return new JSONRPC2Response(1, req.getID());
		} else if (req.getMethod().equals("init")) {
			if (this.debugInitServerMsg) {
				output(req.toString());
			}
			List<Object> params = (List<Object>) req.getPositionalParams();
			initTime = Long.parseLong((String) params.get(0).toString());
			ArrayList<VisualObject> visObjects = new ArrayList<VisualObject>();
			convertToVisObjects(visObjects, params);
			cycleVisObjectsListToMap(visObjects);

			processDisplay();
			output("Starting model...");

			JSONObject obj = new JSONObject();
			obj.put("Command", "sync");
			getModel().startProcedural();
			server.sendViaConnection(obj.toJSONString());

			if (logData) {
				try {
					dataLogger = new ModelDataLogger(initTime);
					dataLogger.writeInitInfo(initTime, this);
					dataLogger.writeUpdateInfo(currentTaskTime, this, "");
				} catch (FileNotFoundException e) {
					e.printStackTrace();
					output("Failed to generate log file");
				}
			}

			return new JSONRPC2Response(1, req.getID());
		} else if (req.getMethod().equals("exit")) {
			this.server.getTask().stopRemoteTaskServer();
			return new JSONRPC2Response(1, req.getID());
		} else if (req.getMethod().equals("deleteObjects")) {
			List<Object> params = (List<Object>) req.getPositionalParams();
			ArrayList<VisualObject> visObjects = new ArrayList<VisualObject>();
			convertToVisObjects(visObjects, params);
			removeItemsFromScreen(visObjects);
			return new JSONRPC2Response(1, req.getID());
		} else if (req.getMethod().equals("runCommand")) {
			JSONObject debugAndLogging = (JSONObject) req.getPositionalParams()
					.get(0);

			String boolHolder = (String) debugAndLogging.get(
					"debugServerInitMsgs").toString();
			// Compiler
			if (boolHolder.equals("true")) {
				debugInitServerMsg = true;
			} else
				debugInitServerMsg = false;

			boolHolder = (String) debugAndLogging.get("debugServerUpdateMsgs")
					.toString();
			if (boolHolder.equals("true")) {
				debugUpdateMsg = true;
			} else
				debugUpdateMsg = false;

			boolHolder = (String) debugAndLogging.get("recordActrLogFile")
					.toString();
			if (boolHolder.equals("true")) {
				logData = true;
			} else
				logData = false;

			@SuppressWarnings("unchecked")
			List<Object> commands = (List<Object>) req.getPositionalParams()
					.get(1);
			runCommand(commands);
			return new JSONRPC2Response(1, req.getID());
		}

		else {
			return new JSONRPC2Response(JSONRPC2Error.METHOD_NOT_FOUND,
					req.getID());
		}
	}

	/*
	 * One core method used by init and update. Loops through the arraylist of
	 * VisualObjects, takes the items id and sees if it is in the storageMap,
	 * 
	 * If it isn't in there creates the Task element based on the type variable
	 * within the VisualObject adds this to the screen and the map.
	 * 
	 * If it is in the map then it updates that object based on the values
	 * given, Every message sent needs to have a type so it knows how to cast
	 * the object to edit it, can only edit certain values if needed ie sending
	 * only the ID,Color,Type would work
	 * 
	 * Only does this with task relevant objects, task irrelevant objects are
	 * added to the screen and not added to the map, could change this though.
	 * 
	 * Objects default to being task relevant, Color will default to black
	 */
	public void cycleVisObjectsListToMap(ArrayList<VisualObject> visObjects) {
		for (int i = 0; i < visObjects.size(); i++) {

			VisualObject adding = visObjects.get(i);
			NamedColor myColor;
			if (adding.getColor() == null) {
				myColor = NamedColor.BLACK;
			} else {
				String s = adding.getColor().replace("_", "").replace(" ", "")
						.toLowerCase();
				myColor = colorMap.get(s);
			}
			NamedColor secondaryColor;
			if (adding.getSecondaryColor() == null) {
				secondaryColor = NamedColor.BLACK;
			} else {
				String s = adding.getSecondaryColor().replace("_", "")
						.replace(" ", "").toLowerCase();
				secondaryColor = colorMap.get(s);
			}
			if (adding.isTaskRelevant()) {
				// Cast as type variable sent with each value.
				// If found change values that aren't null/-99999
				if (storageMap.containsKey(adding.getId())) {
					if (adding.getType().equals("Line")) {
						TaskLine oldObject = (TaskLine) storageMap.get(adding
								.getId());

						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}

						if (adding.getHeight() != -99999
								&& oldObject.getHeight() != adding.getHeight()) {
							oldObject.setHeight(adding.getHeight());
						}
						if (adding.getWidth() != -99999
								&& adding.getWidth() != oldObject.getWidth()) {
							oldObject.setWidth(adding.getWidth());
						}
						if (adding.getColor() != null) {
							oldObject.changeColor(myColor);
						}

					} else if (adding.getType().equals("Label")) {

						TaskLabel oldObject = (TaskLabel) storageMap.get(adding
								.getId());

						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}
						if (adding.getStringVal() != null
								&& oldObject.getText() != adding.getStringVal()) {
							oldObject.setText(adding.getStringVal());
						}
						if (adding.getColor() != null) {
							oldObject.changeForegroundColor(myColor);
						}

					} else if (adding.getType().equals("Rectangle")) {
						TaskRectangle oldObject = (TaskRectangle) storageMap
								.get(adding.getId());
						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}
						if (adding.getHeight() != -99999
								&& oldObject.getHeight() != adding.getHeight()) {
							oldObject.setHeight(adding.getHeight());
						}
						if (adding.getWidth() != -99999
								&& adding.getWidth() != oldObject.getWidth()) {
							oldObject.setWidth(adding.getWidth());
						}

						if (adding.getColor() != null) {
							oldObject.changeColor(myColor);
						}
					}
					// Add rectangleOutline
					else if (adding.getType().equals("RectangleOutline")) {
						TaskRectangleBorder oldObject = (TaskRectangleBorder) storageMap
								.get(adding.getId());
						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}
						if (adding.getHeight() != -99999
								&& oldObject.getHeight() != adding.getHeight()) {
							oldObject.setHeight(adding.getHeight());
						}
						if (adding.getWidth() != -99999
								&& adding.getWidth() != oldObject.getWidth()) {
							oldObject.setWidth(adding.getWidth());
						}

						if (adding.getColor() != null) {
							oldObject.changeColor(myColor);
						}
					}
					// rectangleOutLineFill
					else if (adding.getType().equals("RectangleOutlineFill")) {
						TaskRectangleBorderFilled oldObject = (TaskRectangleBorderFilled) storageMap
								.get(adding.getId());
						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}
						if (adding.getHeight() != -99999
								&& oldObject.getHeight() != adding.getHeight()) {
							oldObject.setHeight(adding.getHeight());
						}
						if (adding.getWidth() != -99999
								&& adding.getWidth() != oldObject.getWidth()) {
							oldObject.setWidth(adding.getWidth());
						}

						if (adding.getSecondaryColor() != null) {
							oldObject.changeBorderColor(secondaryColor);
						}
						if (adding.getColor() != null) {
							oldObject.changeFillColor(myColor);
						}
					}
					// Oval
					else if (adding.getType().equals("Oval")) {
						TaskOval oldObject = (TaskOval) storageMap.get(adding
								.getId());
						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}
						if (adding.getHeight() != -99999) {
							oldObject.setHeight(adding.getHeight());
						}
						if (adding.getWidth() != -99999) {
							oldObject.setWidth(adding.getWidth());
						}

						if (adding.getColor() != null) {
							oldObject.changeColor(myColor);
						}
					}
					// OvalOutLine
					else if (adding.getType().equals("OvalOutline")) {
						TaskOvalBorder oldObject = (TaskOvalBorder) storageMap
								.get(adding.getId());

						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}
						if (adding.getHeight() != -99999) {
							oldObject.setHeight(adding.getHeight());
						}
						if (adding.getWidth() != -99999) {
							oldObject.setWidth(adding.getWidth());
						}

						if (adding.getColor() != null) {
							oldObject.changeColor(myColor);
						}
					} // OvalOutlineFill
					else if (adding.getType().equals("OvalOutlineFill")) {
						TaskOvalBorderFilled oldObject = (TaskOvalBorderFilled) storageMap
								.get(adding.getId());
						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}
						if (adding.getHeight() != -99999) {
							oldObject.setHeight(adding.getHeight());
						}
						if (adding.getWidth() != -99999) {
							oldObject.setWidth(adding.getWidth());
						}

						if (adding.getColor() != null) {
							oldObject.changeFillColor(myColor);
						}
						if (adding.getSecondaryColor() != null) {
							oldObject.changeBorderColor(secondaryColor);
						}
					}
					// Cross
					else if (adding.getType().equals("Cross")) {
						TaskCross oldObject = (TaskCross) storageMap.get(adding
								.getId());

						if (adding.getX() != -99999
								&& adding.getX() != oldObject.getX()) {
							oldObject.setLocation(adding.getX(),
									oldObject.getY());
						}
						if (adding.getY() != -99999
								&& adding.getY() != oldObject.getY()) {
							oldObject.setLocation(oldObject.getX(),
									adding.getY());
						}

						if (adding.getHeight() != -99999
								&& oldObject.getHeight() != adding.getHeight()) {
							oldObject.setSize(oldObject.getWidth(),
									adding.getWidth());
						}
						if (adding.getWidth() != -99999
								&& oldObject.getWidth() != adding.getWidth()) {
							oldObject.setSize(adding.getWidth(),
									oldObject.getWidth());
						}

						if (adding.getColor() != null) {
							oldObject.changeColor(myColor);
						}

					}
				}
				// ITEM NOT FOUND IN MAP- ADDING NEW OBJECT TO SCREEN AND
				// STORAGEMAP

				// type MUST be sent with new objects
				else {
					if (adding.isClickAble()) {
						clickAbleItems.add(adding);
					}
					if (adding.getType().equals("Line")) {
						TaskLine newLine = new TaskLine(adding.getX(),
								adding.getY(), adding.getWidth(),
								adding.getHeight(), myColor);
						add(newLine);
						storageMap.put(adding.getId(), newLine);
					} else if (adding.getType().equals("Label")) {
						TaskLabel newLabel = new TaskLabel(
								adding.getStringVal(), adding.getX(),
								adding.getY(), adding.getWidth(),
								adding.getHeight(), myColor);
						add(newLabel);
						storageMap.put(adding.getId(), newLabel);
					} else if (adding.getType().equals("Oval")) {
						TaskOval newOval = new TaskOval(adding.getX(),
								adding.getY(), adding.getWidth(),
								adding.getHeight(), myColor);
						add(newOval);
						storageMap.put(adding.getId(), newOval);
					} else if (adding.getType().equals("OvalOutline")) {
						TaskOvalBorder newOval = new TaskOvalBorder(
								adding.getX(), adding.getY(),
								adding.getWidth(), adding.getHeight(),
								adding.getThickness(), myColor);
						add(newOval);
						storageMap.put(adding.getId(), newOval);
					} else if (adding.getType().equals("OvalOutlineFill")) {

						TaskOvalBorderFilled newOval = new TaskOvalBorderFilled(
								adding.getX(), adding.getY(),
								adding.getWidth(), adding.getHeight(),
								adding.getThickness(), secondaryColor, myColor);
						add(newOval);
						storageMap.put(adding.getId(), newOval);
					} else if (adding.getType().equals("Rectangle")) {
						TaskRectangle newRect = new TaskRectangle(
								adding.getX(), adding.getY(),
								adding.getWidth(), adding.getHeight(), myColor);
						add(newRect);
						storageMap.put(adding.getId(), newRect);
					} else if (adding.getType().equals("RectangleOutline")) {
						TaskRectangleBorder newRect = new TaskRectangleBorder(
								adding.getX(), adding.getY(),
								adding.getWidth(), adding.getHeight(),
								adding.getThickness(), myColor);
						add(newRect);
						storageMap.put(adding.getId(), newRect);
					} else if (adding.getType().equals("RectangleOutlineFill")) {
						TaskRectangleBorderFilled newRect = new TaskRectangleBorderFilled(
								adding.getX(), adding.getY(),
								adding.getWidth(), adding.getHeight(),
								adding.getThickness(), secondaryColor, myColor);
						add(newRect);
						storageMap.put(adding.getId(), newRect);
					} else if (adding.getType().equals("Cross")) {
						TaskCross cross = new TaskCross(adding.getX(),
								adding.getY(), adding.getHeight(), myColor);
						add(cross);
						storageMap.put(adding.getId(), cross);
					}

				}

			}
			// Task irrelevant items assumes not storing them to map, could
			// change to store them to map
			else {
				if (adding.getType().equals("Line")) {
					TaskIrrelevantLine addingLine = new TaskIrrelevantLine(
							adding.getX(), adding.getY(), adding.getWidth(),
							adding.getHeight(), myColor.getAwtColor());
					add(addingLine);
				} else if (adding.getType().equals("Label")) {
					TaskIrrelevantLabel addingLabel = new TaskIrrelevantLabel(
							adding.getStringVal(), adding.getX(),
							adding.getY(), adding.getWidth(),
							adding.getHeight(), myColor.getAwtColor());
					add(addingLabel);
				} else if (adding.getType().equals("Box")) {
					TaskIrrelevantBox addingBox = new TaskIrrelevantBox(
							adding.getX(), adding.getY(), adding.getWidth(),
							adding.getHeight(), adding.getThickness(),
							myColor.getAwtColor());
					add(addingBox);
				}
			}
		}

	}

	// populating map with string names and NamedColors
	public void populateColors() {
		colorMap.put("black", NamedColor.BLACK);
		colorMap.put("blue", NamedColor.BLUE);
		colorMap.put("cyan", NamedColor.CYAN);
		colorMap.put("darkgray", NamedColor.DARK_GRAY);
		colorMap.put("gray", NamedColor.GRAY);
		colorMap.put("green", NamedColor.GREEN);
		colorMap.put("lightgray", NamedColor.LIGHT_GRAY);
		colorMap.put("magenta", NamedColor.MAGENTA);
		colorMap.put("orange", NamedColor.ORANGE);
		colorMap.put("pink", NamedColor.PINK);
		colorMap.put("red", NamedColor.RED);
		colorMap.put("white", NamedColor.WHITE);
		colorMap.put("yellow", NamedColor.YELLOW);
		colorMap.put("aliceblue", NamedColor.ALICE_BLUE);
		colorMap.put("antiquewhite", NamedColor.ANTIQUE_WHITE);
		colorMap.put("aqua", NamedColor.AQUA);
		colorMap.put("aquamarine", NamedColor.AQUA_MARINE);
		colorMap.put("azure", NamedColor.AZURE);
		colorMap.put("beige", NamedColor.BEIGE);
		colorMap.put("bisque", NamedColor.BISQUE);
		colorMap.put("blanchedalmond", NamedColor.BLANCHED_ALMOND);
		colorMap.put("blueviolet", NamedColor.BLUE_VIOLET);
		colorMap.put("brown", NamedColor.BROWN);
		colorMap.put("burleywood", NamedColor.BURLEY_WOOD);
		colorMap.put("cadetblue", NamedColor.CADET_BLUE);
		colorMap.put("chartreuse", NamedColor.CHARTREUSE);
		colorMap.put("chocolate", NamedColor.CHOCOLATE);
		colorMap.put("coral", NamedColor.CORAL);
		colorMap.put("cornflowerblue", NamedColor.CORNFLOWER_BLUE);
		colorMap.put("cornsilk", NamedColor.CORNSILK);
		colorMap.put("crimson", NamedColor.CRIMSON);
		colorMap.put("darkblue", NamedColor.DARK_BLUE);
		colorMap.put("darkcyan", NamedColor.DARK_CYAN);
		colorMap.put("darkgoldenrod", NamedColor.DARK_GOLDEN_Rod);
		colorMap.put("darkgreen", NamedColor.DARK_GREEN);
		colorMap.put("darkkhaki", NamedColor.DARK_KHAKI);
		colorMap.put("darkmagenta", NamedColor.DARK_MAGENTA);
		colorMap.put("darkolivegreen", NamedColor.DARK_OLIVE_GREEN);
		colorMap.put("darkorange", NamedColor.DARK_ORANGE);
		colorMap.put("darkorchid", NamedColor.DARK_ORCHID);
		colorMap.put("darkred", NamedColor.DARK_RED);
		colorMap.put("darksalmon", NamedColor.DARK_SALMON);
		colorMap.put("darkseagreen", NamedColor.DARK_SEA_GREEN);
		colorMap.put("darkslateblue", NamedColor.DARK_SLATE_BLUE);
		colorMap.put("darkslategray", NamedColor.DARK_SLATE_GRAY);
		colorMap.put("darkturquoise", NamedColor.DARK_TURQUOISE);
		colorMap.put("darkviolet", NamedColor.DARK_VIOLET);
		colorMap.put("deeppink", NamedColor.DEEP_PINK);
		colorMap.put("deepskyblue", NamedColor.DEEP_SKY_BLUE);
		colorMap.put("dimgray", NamedColor.DIM_GRAY);
		colorMap.put("dodgerblue", NamedColor.DODGER_BLUE);
		colorMap.put("firebrick", NamedColor.FIRE_BRICK);
		colorMap.put("floralwhite", NamedColor.FLORAL_WHITE);
		colorMap.put("forestgreen", NamedColor.FOREST_GREEN);
		colorMap.put("fuchsia", NamedColor.FUCHSIA);
		colorMap.put("gainsboro", NamedColor.GAINSBORO);
		colorMap.put("ghostwhite", NamedColor.GHOST_WHITE);
		colorMap.put("gold", NamedColor.GOLD);
		colorMap.put("goldenrod", NamedColor.GOLDEN_ROD);
		colorMap.put("greenyellow", NamedColor.GREEN_YELLOW);
		colorMap.put("honeydew", NamedColor.HONEY_DEW);
		colorMap.put("hotpink", NamedColor.HOT_PINK);
		colorMap.put("indianred", NamedColor.INDIAN_RED);
		colorMap.put("indigo", NamedColor.INDIGO);
		colorMap.put("ivory", NamedColor.IVORY);
		colorMap.put("khaki", NamedColor.KHAKI);
		colorMap.put("lavender", NamedColor.LAVENDER);
		colorMap.put("lavenderblush", NamedColor.LAVENDER_BLUSH);
		colorMap.put("lawngreen", NamedColor.LAWN_GREEN);
		colorMap.put("lemonchiffon", NamedColor.LEMON_CHIFFON);
		colorMap.put("lightblue", NamedColor.LIGHT_BLUE);
		colorMap.put("lightcoral", NamedColor.LIGHT_CORAL);
		colorMap.put("lightcyan", NamedColor.LIGHT_CYAN);
		colorMap.put("lightgoldenrodyellow", NamedColor.LIGHT_GOLDEN_RodYellow);
		colorMap.put("lightgreen", NamedColor.LIGHT_GREEN);
		colorMap.put("lightpink", NamedColor.LIGHT_PINK);
		colorMap.put("lightsalmon", NamedColor.LIGHT_SALMON);
		colorMap.put("lightseagreen", NamedColor.LIGHT_SEA_GREEN);
		colorMap.put("lightskyblue", NamedColor.LIGHT_SKY_BLUE);
		colorMap.put("lightslategray", NamedColor.LIGHT_SLATE_GRAY);
		colorMap.put("lightsteelblue", NamedColor.LIGHT_STEEL_BLUE);
		colorMap.put("lightyellow", NamedColor.LIGHT_YELLOW);
		colorMap.put("lime", NamedColor.LIME);
		colorMap.put("limegreen", NamedColor.LIME_GREEN);
		colorMap.put("linen", NamedColor.LINEN);
		colorMap.put("maroon", NamedColor.MAROON);
		colorMap.put("mediumaquamarine", NamedColor.MEDIUM_AQUA_MARINE);
		colorMap.put("mediumblue", NamedColor.MEDIUM_BLUE);
		colorMap.put("mediumorchid", NamedColor.MEDIUM_ORCHID);
		colorMap.put("mediumpurple", NamedColor.MEDIUM_PURPLE);
		colorMap.put("mediumseagreen", NamedColor.MEDIUM_SEA_GREEN);
		colorMap.put("mediumslateblue", NamedColor.MEDIUM_SLATE_BLUE);
		colorMap.put("mediumspringgreen", NamedColor.MEDIUM_SPRING_GREEN);
		colorMap.put("mediumturquoise", NamedColor.MEDIUM_TURQUOISE);
		colorMap.put("mediumvioletred", NamedColor.MEDIUM_VIOLET_RED);
		colorMap.put("midnightblue", NamedColor.MIDNIGHT_BLUE);
		colorMap.put("mintcream", NamedColor.MINT_CREAM);
		colorMap.put("mistyrose", NamedColor.MISTY_ROSE);
		colorMap.put("moccasin", NamedColor.MOCCASIN);
		colorMap.put("navajowhite", NamedColor.NAVAJO_WHITE);
		colorMap.put("navy", NamedColor.NAVY);
		colorMap.put("oldlace", NamedColor.OLD_LACE);
		colorMap.put("olive", NamedColor.OLIVE);
		colorMap.put("olivedrab", NamedColor.OLIVE_DRAB);
		colorMap.put("orangered", NamedColor.ORANGE_RED);
		colorMap.put("orchid", NamedColor.ORCHID);
		colorMap.put("palegoldenrod", NamedColor.PALE_GOLDEN_ROD);
		colorMap.put("palegreen", NamedColor.PALE_GREEN);
		colorMap.put("paleturquoise", NamedColor.PALE_TURQUOISE);
		colorMap.put("palevioletred", NamedColor.PALE_VIOLET_RED);
		colorMap.put("papayawhip", NamedColor.PAPAYA_WHIP);
		colorMap.put("peachpuff", NamedColor.PEACH_PUFF);
		colorMap.put("peru", NamedColor.PERU);
		colorMap.put("plum", NamedColor.PLUM);
		colorMap.put("powderblue", NamedColor.POWDER_BLUE);
		colorMap.put("purple", NamedColor.PURPLE);
		colorMap.put("rosybrown", NamedColor.ROSY_BROWN);
		colorMap.put("royalblue", NamedColor.ROYAL_BLUE);
		colorMap.put("saddlebrown", NamedColor.SADDLE_BROWN);
		colorMap.put("salmon", NamedColor.SALMON);
		colorMap.put("sandybrown", NamedColor.SANDY_BROWN);
		colorMap.put("seagreen", NamedColor.SEA_GREEN);
		colorMap.put("seashell", NamedColor.SEA_SHELL);
		colorMap.put("sienna", NamedColor.SIENNA);
		colorMap.put("silver", NamedColor.SILVER);
		colorMap.put("skyblue", NamedColor.SKY_BLUE);
		colorMap.put("slateblue", NamedColor.SLATE_BLUE);
		colorMap.put("slategray", NamedColor.SLATE_GRAY);
		colorMap.put("snow", NamedColor.SNOW);
		colorMap.put("springgreen", NamedColor.SPRING_GREEN);
		colorMap.put("steelblue", NamedColor.STEEL_BLUE);
		colorMap.put("tan", NamedColor.TAN);
		colorMap.put("teal", NamedColor.TEAL);
		colorMap.put("thistle", NamedColor.THISTLE);
		colorMap.put("tomato", NamedColor.TOMATO);
		colorMap.put("turquoise", NamedColor.TURQUOISE);
		colorMap.put("violet", NamedColor.VIOLET);
		colorMap.put("wheat", NamedColor.WHEAT);
		colorMap.put("whitesmoke", NamedColor.WHITE_SMOKE);
		colorMap.put("yellowgreen", NamedColor.YELLOW_GREEN);
	}

	/**
	 * Used to remove items from screen and map. Takes ArrayList of visual
	 * objects, these VisualObjects must have id and type
	 * 
	 * Haven't had a use for it yet however there is definitely a use for it in
	 * the future
	 */
	public void removeItemsFromScreen(ArrayList<VisualObject> visObjects) {
		for (int i = 0; i < visObjects.size(); i++) {
			Object screenObject = storageMap.get(visObjects.get(i).getId());
			if (screenObject instanceof TaskLabel) {
				this.remove((TaskLabel) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			} else if (screenObject instanceof TaskLine) {
				this.remove((TaskLine) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			} else if (screenObject instanceof TaskOval) {
				this.remove((TaskOval) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			} else if (screenObject instanceof TaskOvalBorder) {
				this.remove((TaskOvalBorder) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			} else if (screenObject instanceof TaskOvalBorderFilled) {
				this.remove((TaskOvalBorderFilled) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			} else if (screenObject instanceof TaskRectangle) {
				this.remove((TaskRectangle) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			} else if (screenObject instanceof TaskRectangleBorder) {
				this.remove((TaskRectangleBorder) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			} else if (screenObject instanceof TaskRectangleBorderFilled) {
				this.remove((TaskRectangleBorderFilled) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			} else if (screenObject instanceof TaskCross) {
				this.remove((TaskCross) screenObject);
				storageMap.remove(visObjects.get(i).getId());
			}
		}
	}

	public void output(String string) {
		this.getModel().output(string);
	}

	/*
	 * Converts a list of JSON objects stored in a JSON array within a list into
	 * an ArrayList of VisualObjects storing null or -99999 to values if they
	 * are not sent, this way it can allow you to update only certain variables,
	 * however it assumes you would have all information for each Task item when
	 * they are initially added and there is no sort of error checking for the
	 * client not having a height value with a rectangle object for example
	 */
	void convertToVisObjects(ArrayList<VisualObject> visObjects,
			List<Object> params) {
		JSONArray firstArray = ((JSONArray) (params.get(1)));
		for (int i = 0; i < firstArray.size(); i++) {
			// Assumes time is always first parameter and things are pushed into
			// a json array and that is the second parameter in params.
			// Using -99999 as a kind of null value and checking for it when i
			// update, 0 doesn't work because some things can be of that
			// size/location
			int x = -99999, y = -99999, height = -99999, width = -99999, thickness = -99999;
			String color = null, id = null, type = null, stringVal = null, secondaryColor = null;
			boolean taskRelevant = true, clickAble = false;

			JSONObject currentObj = (JSONObject) firstArray.get(i);
			if (currentObj.get("id") != null) {
				id = (String) currentObj.get("id");
			}
			if (currentObj.get("color") != null) {
				color = (String) currentObj.get("color");
			}
			if (currentObj.get("secondaryColor") != null) {
				secondaryColor = (String) currentObj.get("secondaryColor");
			}
			if (currentObj.get("stringVal") != null) {
				stringVal = (String) currentObj.get("stringVal");
			}
			if (currentObj.get("type") != null) {
				type = (String) currentObj.get("type");
			}
			if (currentObj.get("x") != null) {
				x = (int) Double.parseDouble(currentObj.get("x").toString());
			}
			if (currentObj.get("y") != null) {
				y = (int) Double.parseDouble(currentObj.get("y").toString());
			}
			if (currentObj.get("width") != null) {
				width = (int) Double.parseDouble(currentObj.get("width")
						.toString());
			}
			if (currentObj.get("height") != null) {
				height = (int) Double.parseDouble(currentObj.get("height")
						.toString());
			}
			if (currentObj.get("thickness") != null) {
				thickness = (int) Double.parseDouble(currentObj
						.get("thickness").toString());
			}
			if (currentObj.get("taskRelevant") != null) {
				String boolHolder = (String) currentObj.get("taskRelevant")
						.toString();
				if (boolHolder.equals("true")) {
					taskRelevant = true;
				} else
					taskRelevant = false;
			}
			if (currentObj.get("clickable") != null) {
				String boolHolder = (String) currentObj.get("clickable")
						.toString();
				if (boolHolder.equals("true")) {
					clickAble = true;
				} else
					clickAble = false;
			}
			VisualObject toAdd = new VisualObject(id, type, x, y, height,
					width, color, taskRelevant, stringVal, thickness,
					clickAble, secondaryColor);
			visObjects.add(toAdd);
		}
	}

	/**
	 * Sends a message every time model moves the mouse. Sends a very basic JSON
	 * object with the command (mouseMove) and the mouseX/mouseY.
	 * 
	 * Client handles what to do with this.
	 */
	@Override
	public void moveMouse(int x, int y) {
		super.moveMouse(x, y);
		JSONObject obj = new JSONObject();
		obj.put("Command", "mouseMove");
		obj.put("mouseX", x);
		obj.put("mouseY", y);
		server.sendViaConnection(obj.toJSONString());
	}

	/**
	 * Called when Model clicks mouse
	 * 
	 * Pushes location of click, command type, all clickable object's
	 * information, and what the click actually was on into a JSON object. Sends
	 * this JSON object to client
	 * 
	 */
	@Override
	public void clickMouse() {
		JSONObject obj = new JSONObject();
		JSONArray jsonClickArray = new JSONArray();
		JSONArray clickedObjects = new JSONArray();

		obj.put("Command", "mouseClick");
		obj.put("mouseX", getMouseX());
		obj.put("mouseY", getMouseY());
		for (int i = 0; i < clickAbleItems.size(); i++) {

			java.awt.Point mouseLocation = new java.awt.Point(
					(int) getMouseX(), (int) getMouseY());

			// Point mouseLocation = new Point(); //Debug related.
			// mouseLocation.x = (int) (object.getX() + 0.5 *
			// object.getWidth());
			// mouseLocation.y = (int) (object.getY() + 0.5 *
			// object.getHeight());
			//
			// System.out.println("Mouse Location " + mouseLocation.x + " "
			// + mouseLocation.y);

			JSONObject test = new JSONObject();
			Object screenObject = storageMap.get(clickAbleItems.get(i).getId());
			test.put("id", clickAbleItems.get(i).getId());
			test.put("type", clickAbleItems.get(i).getType());

			if (screenObject instanceof TaskLabel) {
				TaskLabel myObject = ((TaskLabel) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());
				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}
			} else if (screenObject instanceof TaskLine) {
				TaskLine myObject = ((TaskLine) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());
				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}

			} else if (screenObject instanceof TaskOval) {
				TaskOval myObject = ((TaskOval) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());

				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}

			} else if (screenObject instanceof TaskOvalBorder) {
				TaskOvalBorder myObject = ((TaskOvalBorder) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());
				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}

			} else if (screenObject instanceof TaskOvalBorderFilled) {
				TaskOvalBorderFilled myObject = ((TaskOvalBorderFilled) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());
				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}

			} else if (screenObject instanceof TaskRectangle) {
				TaskRectangle myObject = ((TaskRectangle) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());
				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}

			} else if (screenObject instanceof TaskRectangleBorder) {
				TaskRectangleBorder myObject = ((TaskRectangleBorder) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());
				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}

			} else if (screenObject instanceof TaskRectangleBorderFilled) {
				TaskRectangleBorderFilled myObject = ((TaskRectangleBorderFilled) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());
				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}

			} else if (screenObject instanceof TaskCross) {
				TaskCross myObject = ((TaskCross) screenObject);
				test.put("x", myObject.getX());
				test.put("y", myObject.getY());
				test.put("height", myObject.getHeight());
				test.put("width", myObject.getWidth());
				if (myObject.isComponentAt(mouseLocation)) {
					clickedObjects.add(clickAbleItems.get(i).getId());
				}
			}

			jsonClickArray.add(test);

		}
		// System.out.println("Clicked Objects: " + clickedObjects.size());
		obj.put("allClickableObjects", jsonClickArray);
		obj.put("clickedObjectIdentifiers", clickedObjects);
		server.sendViaConnection(obj.toJSONString());
	}

	/**
	 * Called when model presses a key sends key press interaction to client.
	 * Client decodes using keycode map of ACT-R to JS keycodes
	 */
	@Override
	public void typeKey(String c) {
		JSONObject obj = new JSONObject();
		obj.put("Command", "keypress");
		obj.put("index", c);
		server.sendViaConnection(obj.toJSONString());
	}

	/**
	 * Used for adding commands to ACTR- Strings expected to be LISP like
	 * strings commands is an array of string lisp type commands
	 */
	public void runCommand(List<Object> commands) {
		output("Commands Received : " + commands.toString());
		for (int i = 0; i < commands.size(); i++) {
			this.getModel().runCommand((String) commands.get(i));
		}
	}

	// Override of bind
	// Override of bind
	public double bind(Iterator<String> it) {
		it.next(); // (
		String cmd = it.next();
		if (cmd.equals("get-r")) {
			String hand = it.next();
			String finger = it.next();
			String key = it.next();
			return this.getR(hand, finger, key);
		} else {
			if (cmd.equals("get-theta")) {
				String hand = it.next();
				String finger = it.next();
				String key = it.next();
				return this.getTheta(hand, finger, key);
			} else {
				if (cmd.equals("get-freq-diff")) {
					// (- (* 10 =target-freq) (* 10 =current-freq))
					String targetString = it.next();
					String currentString = it.next();
					this.getModel().output(
							"#### get-freq-diff: " + targetString + " - "
									+ currentString + " = ");
					int targetFreq = (int) (Double.parseDouble(targetString
							.replace("\"", "")) * 10);
					int currentFreq = (int) (Double.parseDouble(currentString
							.replace("\"", "")) * 10);
					this.getModel().output(
							"#### get-freq-diff: " + targetFreq + " - "
									+ currentFreq + " = "
									+ (targetFreq - currentFreq));
					return targetFreq - currentFreq;
				} else {
					return Double.NaN;
				}
			}
		}
	}

	public double getR(String hand, String finger, String key) {
		Point from = this.getModel().getMotor()
				.getFingerPosition(Symbol.get(hand), Symbol.get(finger));
		Point to = this.getModel().getMotor().getKeyPosition(key);
		return from.distanceTo(to);
	}

	public double getTheta(String hand, String finger, String key) {
		Point from = this.getModel().getMotor()
				.getFingerPosition(Symbol.get(hand), Symbol.get(finger));
		Point to = this.getModel().getMotor().getKeyPosition(key);
		return from.angleTo(to);
	}

	@Override
	public void outputOccurred(String s) {
		if (logData) {
			if (s != "--- Waiting for events... ---") {
				@SuppressWarnings("resource")
				Scanner testNum = new Scanner(s);
				if (testNum.hasNextDouble()) {
					String parsedS = (System.currentTimeMillis() - initTime)
							+ " " + s.substring(s.indexOf(".") + 4);
					outList.add(parsedS);
				} else
					outList.add(s);
			}
		}
	}

	public String modHeaders() {
		return this.moduleUtilizationHeader();
	}

	public String modUtil() {
		return this.moduleUtilization();
	}

}
