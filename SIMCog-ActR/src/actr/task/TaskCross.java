package actr.task;

//import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;

import javax.swing.JPanel;
import javax.swing.SwingUtilities;

import java.util.Collections;
import java.util.Map;

/**
 * The class that defines a cross component for a task interface.
 * 
 * @author Dario Salvucci
 */
public class TaskCross extends JPanel implements TaskComponent {
	int size;
	NamedColor color;
	
	/**
	 * Creates a new cross.
	 * 
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param size
	 *            the size (width and height) of the cross
	 */
	public TaskCross(int x, int y, int size) {
		this(x, y, size, NamedColor.BLACK);
	}
	
	/**
	 * Creates a new cross.
	 * 
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param size
	 *            the size (width and height) of the cross
	 * @param color
	 *			  the color
	 */
	public TaskCross(int x, int y, int size, NamedColor color) {
		super();
		this.size = size;
		setForeground(color.getAwtColor());
		setBounds(x, y, size, size);
		this.color = color;
	}
	
	/**
	 * Gets the kind of component (i.e., the "kind" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the kind string
	 */
	@Override
	public String getKind() {
		return "cross";
	}

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the value string
	 */
	@Override
	public String getValue() {
		return "cross";
	}
	
	/**
	 * Moves the cross to a new location.
	 * 
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 */
	@Override
	public void move(int x, int y) {
		setBounds(x, y, size, size);
	}
	
	@Override
	protected void paintComponent(Graphics g) {
		g.setColor(this.getForeground());
		int cx = size / 2;
		int cy = size / 2;
		g.drawLine(0, cy, size, cy);
		g.drawLine(cx, 0, cx, size);
	}
	
	/**
	 * Changes the color.
	 *
	 * @param color
	 *		  color to change to
	 */
	public void changeColor(NamedColor color) {
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
	 *		  a point to test
	 *
	 * @return True if the Point falls within the rectangle of the Cross.
	 */
	public boolean isComponentAt(Point p) {
		Point convertedPoint = SwingUtilities.convertPoint(this.getParent(), p, this);
		
		return this.contains(convertedPoint);
	}
}
