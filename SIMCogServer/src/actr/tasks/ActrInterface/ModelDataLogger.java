package actr.tasks.ActrInterface;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.Date;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONStyle;

public class ModelDataLogger {
	private PrintWriter printToJSON;
	private PrintWriter printToCSV;
	private long InitTime;
	private JSONArray timeData;
	private ArrayList<String> coreList;
	private boolean printCSV = true; // Will print both if directed to.
	private boolean printJSON = true;

	// Modify to allow CSV/JSON/DB writing?
	public ModelDataLogger(long initTime) throws FileNotFoundException {
		coreList = new ArrayList<String>();
		Date initDate = new Date(initTime);
		File logsFolder = (new File("./logs"));
		if (!(logsFolder.exists())) {
			logsFolder.mkdir();
		}
		if (printJSON) {
			File jsonFile = new File("./logs/" + ("simCog " + initDate)
					+ ".json");
			printToJSON = new PrintWriter(jsonFile);
		}
		if (printCSV) {
			File csvFile = new File("./logs/" + ("simCog " + initDate) + ".csv");
			printToCSV = new PrintWriter(csvFile);
		}
	}

	public void writeInitInfo(long initTime, SIMCogACTR genericACTR) {
		InitTime = initTime;
		if (printJSON) {
			timeData = new JSONArray();
			JSONObject initData = new JSONObject();
			initData.put("initTime", initTime);
			initData.put("task", genericACTR.getModel().getTask().toString());
			initData.put("Productions", genericACTR.getModel().getProcedural()
					.toString());
			initData.put("Module headers", genericACTR.modHeaders());
			timeData.add(initData);
		}
		if (printCSV) {
			// printToCSV.print("Time start: " + initTime + ",");
			// printToCSV.print("Task : "
			// + genericACTR.getModel().getTask().toString()
			// .replace("\n", ""));

			printToCSV.println(
			// ",\"Productions : "
			// + genericACTR.getModel().getProcedural().toString()
			// .replace("\n", "")
			// +"\""+ "\n
					"time,declarative,visobj,eyeX,eyeY,events,fatalerrors,buffers,goal,retriv,visloc,"
							+ "vis,aurloc,aur,man,vocal,imag,temp,output");
			// + genericACTR.modHeaders() + " ),");
			// + "Screen Output\n");
		}
	}

	public void writeUpdateInfo(long currentTaskTime, SIMCogACTR genericACTR,
			String output) {
		output = output.replace("\"", "").replace("\"", "");

		Double timeSince = ((double) (currentTaskTime - InitTime) / 1000);
		String declarative;
		String visObj = genericACTR.getModel().getVision().visualObjects()
				.replace("\n", "").replace("\"", "");
		int eyePosX = genericACTR.getModel().getVision().getEyeX();
		int eyePosY = genericACTR.getModel().getVision().getEyeY();
		String events;
		String buffers;
		String modulUtilization = genericACTR.modUtil().replaceAll("\\d", "")
				.replace(".", "").replace("\"", "");

		String fatalErrors;
		if (genericACTR.getModel().hasFatalErrors()) {
			fatalErrors = "1";
		} else
			fatalErrors = "0";
		if (output == "[]") {
			output = "";
		}

		ArrayList<String> newVisObj = new ArrayList<String>();

		while (visObj.contains(")(")) {
			if (!coreList
					.contains(visObj.substring(0, visObj.indexOf(")(") + 1))) { // add
																				// if
																				// not
																				// in
																				// core
				newVisObj.add(visObj.substring(0, visObj.indexOf(")(") + 1));
			}
			visObj = visObj.substring(visObj.indexOf(")(") + 1);
		}
		if (!coreList.contains(visObj)) { // add last
			newVisObj.add(visObj);
		}
		visObj = "";

		for (int i = 0; i < newVisObj.size(); i++) { // Loop all new objects
			Boolean found = false;
			String name = newVisObj.get(i).substring(1,
					newVisObj.get(i).indexOf(" ")); // get name of changed
			for (int j = 0; j < coreList.size(); j++) { // find name in core
				// list
				String corename = coreList.get(j).substring(1,
						coreList.get(j).indexOf(" "));
				if (corename.equals(name)) { // if name matches switch it
					coreList.set(j, newVisObj.get(i));
					found = true;
				}

			}
			if (!found) { // if at end and haven't found is
				// new var add to core
				coreList.add(newVisObj.get(i));
			}
		}

		modulUtilization = modulUtilization.replace("true", "1");
		modulUtilization = modulUtilization.replace("false", "0");
		modulUtilization = modulUtilization.replace("	", ",");
		modulUtilization = modulUtilization.replace(" ", "");
		modulUtilization = modulUtilization.substring(1);
		String[] modArray = modulUtilization.split(",");

		String goalBusy = modArray[0];
		String retrievalBusy = modArray[1];
		String vislocBusy = modArray[2];
		String visualBusy = modArray[3];
		String aurlocBus = modArray[4];
		String auralBusy = modArray[5];
		String manualBusy = modArray[6];
		String vocalBusy = modArray[7];
		String imaginalBusy = modArray[8];
		String temporalBusy = modArray[9];

		try {
			events = genericACTR.getModel().getEvents().toString()
					.replace("\n", "").replace("\"", ";");
			if (events.equals("Events:")) {
				events = "";
			}
		} catch (ConcurrentModificationException e) {
			events = "error: conrruent modification";
		}
		try {
			try {
				buffers = genericACTR.getModel().getBuffers().toString()
						.replace("\n", "").replace("\"", "'");
			} catch (ConcurrentModificationException e) {
				buffers = "error: conrruent modification";
			}
		} catch (ArrayIndexOutOfBoundsException i) {
			buffers = "index error";
		}

		try {
			declarative = genericACTR.getModel().getDeclarative().toString()
					.replace("\n", "").replace("\"", "");
		} catch (ConcurrentModificationException e) {
			declarative = "error: conrruent modification";
		}
		if (printJSON) {
			JSONObject arrayObject = new JSONObject();
			arrayObject.put("timeSince", timeSince);
			arrayObject.put("declarative", declarative);
			arrayObject.put("visObj", newVisObj.toString());
			arrayObject.put("eyeLocX", eyePosX);
			arrayObject.put("eyeLocY", eyePosY);
			arrayObject.put("events", events);
			arrayObject.put("fatalErrors", fatalErrors);
			arrayObject.put("buffers", buffers);
			arrayObject.put("goalBusy", goalBusy);
			arrayObject.put("retrievalBusy", retrievalBusy);
			arrayObject.put("vislocBusy", vislocBusy);
			arrayObject.put("visualBusy", visualBusy);
			arrayObject.put("aurlocBus", aurlocBus);
			arrayObject.put("auralBusy", auralBusy);
			arrayObject.put("manualBusy", manualBusy);
			arrayObject.put("vocalBusy", vocalBusy);
			arrayObject.put("imaginalBusy", imaginalBusy);
			arrayObject.put("temporalBusy", temporalBusy);
			arrayObject.put("output", output);
			timeData.add(arrayObject);

		}
		if (printCSV) {

			String outString = timeSince + ",\"" + declarative + "\",\""
					+ newVisObj + "\",\"" + eyePosX + "\"," + eyePosY + ",\"" + events
					+ "\",\"" + fatalErrors + "\",\"" + buffers + "\","
					+ goalBusy + "," + retrievalBusy + "," + vislocBusy + ","
					+ visualBusy + "," + aurlocBus + "," + auralBusy + ","
					+ manualBusy + "," + vocalBusy + "," + imaginalBusy + ","
					+ temporalBusy + ",\"" + output + "\"";
			printToCSV.println(outString);
		}
	}

	public void close() {
		JSONStyle a = JSONStyle.NO_COMPRESS;
		a.indent();
		if (printJSON) {
			printToJSON.print(timeData.toJSONString(a));
			printToJSON.close();
		}
		if (printCSV) {
			printToCSV.close();
		}
	}

}
