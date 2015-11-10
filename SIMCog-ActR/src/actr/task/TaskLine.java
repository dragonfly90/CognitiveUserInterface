package actr.task;

//import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;

import javax.swing.JPanel;
import javax.swing.SwingUtilities;

import java.util.Collections;
import java.util.Map;

/**
 * The class that defines a line component for a task interface.
 *
 * @author Dario Salvucci
 */
public class TaskLine extends JPanel implements TaskComponent {
	NamedColor color;

	/**
	 * Creates a new line.
	 * 
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param width
	 *            the width
	 * @param height
	 *            the height
	 * @param color
	 *            the color of the line
	 */
	public TaskLine (int x, int y, int width, int height, NamedColor color) {
		super();
		setForeground(color.getAwtColor());
		setBounds(x, y, width, height);
		this.color = color;
	}

	/**
	 * Creates a new line with the default color (black).
	 * 
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param width
	 *            the width
	 * @param height
	 *            the height
	 */
	public TaskLine(int x, int y, int width, int height) {
		this(x, y, width, height, NamedColor.BLACK);
	}

	/**
	 * Gets the kind of component (i.e., the "kind" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the kind string
	 */
	@Override
	public String getKind() {
		return "line";
	}

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the value string
	 */
	@Override
	public String getValue() {
		return "line";
	}

	/**
	 * Sets the width of the line.
	 * 
	 * @param width
	 *            the new width
	 */
	public void setWidth(int width) {
		setBounds(getX(), getY(), width, getHeight());
	}

	/**
	 * Changes the width by the given amount.
	 * 
	 * @param dwidth
	 *            the change in width
	 */
	public void changeWidth(int dwidth) {
		setBounds(getX(), getY(), dwidth + getWidth(), getHeight());
	}

	/**
	 * Sets the height of the line.
	 * 
	 * @param height
	 *            the new height
	 */
	public void setHeight(int height) {
		setBounds(getX(), getY(), getWidth(), height);
	}

	/**
	 * Changes the height by the given amount.
	 * 
	 * @param dheight
	 *            the change in height
	 */
	public void changeHeight(int dheight) {
		setBounds(getX(), getY(), getWidth(), dheight + getHeight());
	}

	@Override
	protected void paintComponent(Graphics g) {
		g.setColor(this.getForeground());
		g.fillRect(0, 0, getWidth(), getHeight());
	}

	/**
	 * Changes the color.
	 *
	 * @param color
	 *			  color to change to
	 */
	public void changeColor(NamedColor color)
	{
		setForeground (color.getAwtColor());
		this.color = color;
	}
	
	public NamedColor getNamedColor() {
		return this.color;
	}

	@Override
	public Map<String, String> getOtherSlots() {
		return Collections.singletonMap("color", this.color.getColorName());
	}
	
	/**
	 * Determines if a point is contained in this object.
	 * Assumes that all TaskComponents are contained in the Task panel.
	 *
	 * @param p
	 *			  a point to test
	 *
	 * @return True if the Point falls within the rectangle of the Cross.
	 */
	public boolean isComponentAt(Point p) {
		Point convertedPoint = SwingUtilities.convertPoint(this.getParent(), p, this);
		
		return this.contains(convertedPoint);
	}
}
