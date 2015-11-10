package actr.task;

import java.awt.*;
import java.awt.geom.Ellipse2D;

import javax.swing.SwingUtilities;

/**
 * The class that defines an oval component for a task interface.
 * 
 * @author Tim Halverson
 */
public class TaskOval extends TaskLine
{	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Creates a new oval.
	 * @param x the x coordinate
	 * @param y the y coordinate
	 * @param width the width of the oval
	 * @param height the height of the oval
	 */
	public TaskOval (int x, int y, int width, int height) 
	{
		this(x, y, width, height, NamedColor.BLACK);
	}
	
	/**
	 * Creates a new oval.
	 * @param x the x coordinate
	 * @param y the y coordinate
	 * @param width the width of the oval
	 * @param height the height of the oval
	 * @param color the color
	 */
	public TaskOval (int x, int y, int width, int height, NamedColor color) 
	{
		super(x, y, width, height, color);
	}
	
	/**
	 * Gets the kind of component (i.e., the "kind" slot of the ACT-R visual object).
	 * @return the kind string
	 */
	public String getKind () { return "oval"; }

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual object).
	 * @return the value string
	 */
	public String getValue () { return "oval"; }
		
	protected void paintComponent (Graphics g)
	{
		Graphics2D g2d = (Graphics2D)g;
		Ellipse2D.Double oval = new Ellipse2D.Double(0, 0, getWidth(), getHeight());
		g2d.fill(oval);
	}
	
	/**
	 * Determines if a point is contained in this object.
	 * Assumes that all TaskComponents are contained in the Task panel.
	 * @param p a point to test
	 * @return True if the Point falls within the rectangle of the Cross.
	 */
	public boolean isComponentAt(Point p) {
		Point convertedPoint = SwingUtilities.convertPoint(this.getParent(), p, this);
		Ellipse2D.Double oval = new Ellipse2D.Double(0, 0, getWidth(), getHeight());
		return oval.contains(convertedPoint);
	}
}
