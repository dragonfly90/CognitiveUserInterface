package actr.task;

import javax.swing.JLabel;
//import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;

import java.awt.Point;
import java.util.Hashtable;
import java.util.Map;

/**
 * The class that defines a label for a task interface.
 * 
 * @author Dario Salvucci
 */
public class TaskLabel extends JLabel implements TaskComponent {

	private NamedColor foreground;
	private NamedColor background;

	
	/**
	 * Creates a new label.
	 * 
	 * @param text
	 *            the label text
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param width
	 *            the width
	 * @param height
	 *            the height
	 */
	public TaskLabel(String text, int x, int y, int width, int height) {
		this(text, x, y, width, height, NamedColor.BLACK);
	}

	/**
	 * Creates a new label.
	 * 
	 * @param text
	 *            the label text
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param width
	 *            the width
	 * @param height
	 *            the height
	 * @param color
	 *			  the color of the text
	 */
	public TaskLabel(String text, int x, int y, int width, int height, NamedColor color) {
		this(text, x, y, width, height, color, NamedColor.BLACK);
	}

	/**
	 * Creates a new label.
	 * 
	 * @param text
	 *            the label text
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param width
	 *            the width
	 * @param height
	 *            the height
	 * @param foreground
	 *			  the color of the text
	 * @param background
	 *			  the color of the background
	 */
	public TaskLabel(String text, int x, int y, int width, int height, NamedColor foreground, NamedColor background) {
		super (text);

		this.foreground = foreground;
		this.background = background;
		setForeground(foreground.getAwtColor());
		setBackground(background.getAwtColor());
		setBounds (x, y, width, height);
		setHorizontalAlignment (JLabel.CENTER);
		setVerticalAlignment (JLabel.CENTER);
	}

	/**
	 * Gets the kind of component (i.e., the "kind" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the kind string
	 */
	@Override
	public String getKind() {
		return "text";
	}

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the value string
	 */
	@Override
	public String getValue() {
		return '"' + getText() + '"';
	}
	
	/**
	 * Changes the text (i.e. foreground) color.
	 *
	 * @param color
	 *			  color to change to
	 */
	public void changeForegroundColor(NamedColor color)
	{
		setForeground(color.getAwtColor());
		this.foreground = color;
	}
	
	public NamedColor getForegroundNamedColor() {
		return this.foreground;
	}
	
	/**
	 * Changes the background color.
	 *
	 * @param color
	 *			  color to change to
	 */
	public void changeBackgroundColor(NamedColor color)
	{
		setBackground(color.getAwtColor());
		this.background = color;
	}
	
	public NamedColor getBackgroundNamedColor() {
		return this.background;
	}

	@Override
	public Map<String, String> getOtherSlots() {
		Map<String,String> toReturn = new Hashtable<String,String>(4);
		toReturn.put("color", this.foreground.getColorName());
		toReturn.put("backgroundcolor", this.background.getColorName());
		return toReturn;
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
