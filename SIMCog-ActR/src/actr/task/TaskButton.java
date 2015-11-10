package actr.task;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.Point;
import java.util.Hashtable;
import java.util.Map;

import javax.swing.JButton;
import javax.swing.SwingUtilities;

/**
 * The class that defines a button for a task interface. A subclass of this
 * class can override the <tt>doClick()</tt> method to specify the response to a
 * mouse click.
 * 
 * @author Dario Salvucci
 */
public class TaskButton extends JButton implements TaskComponent
{
	private NamedColor foreground;
	private NamedColor background;

	/**
	 * Creates a new task button.
	 * 
	 * @param text
	 *            the text on the button
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param width
	 *            the width
	 * @param height
	 *            the height
	 */
	public TaskButton(String text, int x, int y, int width, int height) {
		this(text, x, y, width, height, NamedColor.BLACK);
	}
	
	/**
	 * Creates a new task button.
	 * 
	 * @param text
	 *            the text on the button
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param width
	 *            the width
	 * @param height
	 *            the height
	 * @param color
	 *			  the color
	 */
	public TaskButton(String text, int x, int y, int width, int height, NamedColor color) {
		this(text, x, y, width, height, color, NamedColor.WHITE);
	}
	
	/**
	 * Creates a new task button.
	 * 
	 * @param text
	 *            the text on the button
	 * @param x
	 *            the x coordinate
	 * @param y
	 *            the y coordinate
	 * @param width
	 *            the width
	 * @param height
	 *            the height
	 * @param foreground
	 *			  the foreground color
	 * @param background
	 *			  the background color
	 */
	public TaskButton(String text, int x, int y, int width, int height, NamedColor foreground, NamedColor background)  {
		super(text);
		this.foreground = foreground;
		this.background = background;
		setForeground(foreground.getAwtColor());
		setBackground(background.getAwtColor());
		setBounds(x, y, width, height);
		addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				doClick();
			}
		});
	}
	
	/**
	 * Gets the kind of component (i.e., the "kind" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the kind string
	 */
	@Override
	public String getKind() {
		return "button";
	}

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual
	 * object).
	 *
	 * @return the value string
	 */
	@Override
	public String getValue() {
		return getText();
	}
	
	/**
	 * Changes the text (i.e. foreground) color.
	 *
	 * @param color
	 *		  color to change to
	 */
	public void changeForegroundColor(NamedColor color)
	{
		setForeground (color.getAwtColor());
		this.foreground = color;
	}
	
	public NamedColor getForegroundNamedColor() {
		return this.foreground;
	}
	
	/**
	 * Changes the background color.
	 * @param color color to change to
	 */
	public void changeBackgroundColor (NamedColor color)
	{
		setBackground (color.getAwtColor());
		this.background = color;
	}
	
	public NamedColor getBackgroundNamedColor() {
		return this.background;
	}
	
	/**
	 * The method called when the button is clicked. This should be overridden
	 * to provide task-specific functionality.
	 */
	@Override
	public void doClick() {
	}
	
	public Map<String, String> getOtherSlots() {
		Map<String,String> toReturn = new Hashtable<String,String>(4);
		toReturn.put("color", this.foreground.getColorName());
		toReturn.put("backgroundcolor", this.background.getColorName());
		return toReturn;
	}
	
	//	Assumes that all TaskComponents are contained in the Task panel.
	public boolean isComponentAt(Point p) {
		Point convertedPoint = SwingUtilities.convertPoint(this.getParent(), p, this);
		
		return this.contains(convertedPoint);
	}
}
