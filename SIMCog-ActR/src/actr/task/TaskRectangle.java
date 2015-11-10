package actr.task;

/**
 * The class that defines a rectangle component for a task interface.
 * This is a convenience class. A TaskRectangle is only a TaskLine
 * with a kind and value of "rectangle".
 * Fill and border are the same color, and so there is only one
 * color slot named "color" for the fill.
 * 
 * @author Tim Halverson
 */
public class TaskRectangle extends TaskLine implements TaskComponent
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Creates a new rectangle.
	 * @param x the x coordinate
	 * @param y the y coordinate
	 * @param width the width of the rectangle
	 * @param height the height of the rectangle
	 */
	public TaskRectangle (int x, int y, int width, int height) 
	{
		this(x, y, width, height, NamedColor.BLACK);
	}
	
	/**
	 * Creates a new rectangle.
	 * @param x the x coordinate
	 * @param y the y coordinate
	 * @param width the width of the rectangle
	 * @param height the height of the rectangle
	 * @param color the color
	 */
	public TaskRectangle (int x, int y, int width, int height, NamedColor color) 
	{
		super(x, y, width, height, color);
	}
	
	/**
	 * Gets the kind of component (i.e., the "kind" slot of the ACT-R visual object).
	 * @return the kind string
	 */
	public String getKind () { return "rectangle"; }

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual object).
	 * @return the value string
	 */
	public String getValue () { return "rectangle"; }
}
