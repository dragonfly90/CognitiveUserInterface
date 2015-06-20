package actr.tasks.ActrInterface;

/**
 * Class used for storing parsed JSON screen object
 * makes things easier to deal with.
 * @author brad
 * 
 */
public class VisualObject {
	private String id; // Ie monitor_button_0
	private String type; // Structure type, rectangle, line, oval etc
	private int x; // X location
	private int y; // Y location
	private int height; // Height
	private int width; // Width
	private String color; // Color
	private boolean taskRelevant; // Relevance to the task.
	private String stringVal; // String attached to item, pretty much only for
								// Labels
	private String secondaryColor; //secondary border color
	private int thickness; // Wall thickness 
	private boolean clickAble; //If object is clickable

	public VisualObject() {
		super();
	}

	public VisualObject(String id, String type, int x, int y, int height,
			int width, String color, boolean taskRelevant, String stringVal,
			int thickness, boolean clickAble, String secondaryColor) {
		super();
		this.id = id;
		this.type = type;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
		this.color = color;
		this.taskRelevant = taskRelevant;
		this.stringVal = stringVal;
		this.thickness = thickness;
		this.clickAble = clickAble;
		this.secondaryColor = secondaryColor;
	}

	public boolean isTaskRelevant() {
		return taskRelevant;
	}

	public void setTaskRelevant(boolean taskRelevant) {
		this.taskRelevant = taskRelevant;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public String getSecondaryColor() {
		return secondaryColor;
	}

	public void setSecondaryColor(String secondaryColor) {
		this.secondaryColor = secondaryColor;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getStringVal() {
		return stringVal;
	}

	public void setStringVal(String stringVal) {
		this.stringVal = stringVal;
	}

	public boolean isClickAble() {
		return clickAble;
	}

	public void setClickAble(boolean clickAble) {
		this.clickAble = clickAble;
	}

	public int getThickness() {
		return thickness;
	}

	public void setThickness(int thickness) {
		this.thickness = thickness;
	}

	@Override
	public String toString() {
		return "VisualObject [id=" + id + ", type=" + type + ", x=" + x
				+ ", y=" + y + ", height=" + height + ", width=" + width
				+ ", color=" + color + ", taskRelevant=" + taskRelevant
				+ ", stringVal=" + stringVal + ", secondaryColor="
				+ secondaryColor + ", thickness=" + thickness + ", clickAble="
				+ clickAble + "]";
	}

}
