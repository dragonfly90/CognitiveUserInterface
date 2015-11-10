package actr.task;

import java.awt.BasicStroke;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.util.Hashtable;
import java.util.Map;

/**
 * The class that defines a rectangle that is filled and has a boundary
 * that can be up to max(width, height) / 2 - 1.
 * 
 * @author Tim Halverson
 */
public class TaskRectangleBorderFilled extends TaskRectangleBorder {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private NamedColor fillColor;
	private boolean fillIsPrimary;

	public TaskRectangleBorderFilled(int x, int y, int width, int height, int thickness,
			NamedColor borderColor, NamedColor fillColor, boolean fillIsPrimary) {
		super(x, y, width, height, thickness, borderColor);
		this.fillColor = fillColor;
		this.setBackground(fillColor.getAwtColor());
		this.fillIsPrimary = fillIsPrimary;
	}

	public TaskRectangleBorderFilled(int x, int y, int width, int height, int thickness,
			NamedColor borderColor, NamedColor fillColor) {
		this(x, y, width, height, thickness, borderColor, fillColor, true);
	}

	public TaskRectangleBorderFilled(int x, int y, int width, int height, int thickness,
			boolean fillIsPrimary) {
		this(x, y, width, height, thickness, NamedColor.WHITE, NamedColor.BLACK, fillIsPrimary);
	}

	public TaskRectangleBorderFilled(int x, int y, int width, int height, int thickness) {
		this(x, y, width, height, thickness, NamedColor.WHITE, NamedColor.BLACK);
	}

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual object).
	 * @return the value string
	 */
	@Override
	public String getValue () { return Integer.toString(this.thickness); }
	
	/**
	 * Changes the fill (i.e. background) color.
	 * @param color color to change to
	 */
	public void changeFillColor(NamedColor color)
	{
		setBackground(color.getAwtColor());
		this.fillColor = color;
	}
	
	public NamedColor getFillNamedColor() {
		return this.fillColor;
	}
	
	/**
	 * Changes the border (i.e. foreground) color.
	 * @param color color to change to
	 */
	public void changeBorderColor (NamedColor color)
	{
		setForeground(color.getAwtColor());
		this.color = color;
	}
	
	public NamedColor getBorderNamedColor() {
		return this.color;
	}
	
	@Override
	protected void paintComponent (Graphics g)
	{		
		Graphics2D g2 = (Graphics2D)g;
		g2.setStroke(new BasicStroke(this.thickness));
		g.setColor(this.getForeground());
		g2.drawRect(this.thickness/2, this.thickness/2, getWidth() - this.thickness, getHeight() - this.thickness);
		g2.setStroke(new BasicStroke());
		g2.setColor (this.getBackground());
		g.fillRect(this.thickness - 1, this.thickness - 1, getWidth() - 2*this.thickness + 1, getHeight() - 2*this.thickness + 1);
	}
	
	@Override
	public Map<String, String> getOtherSlots() {
		Map<String,String> toReturn = new Hashtable<String,String>(4);
		if(this.fillIsPrimary) {
			toReturn.put("color", this.fillColor.getColorName());
			toReturn.put("bordercolor", this.color.getColorName());
		} else {
			toReturn.put("color", this.color.getColorName());
			toReturn.put("fillcolor", this.fillColor.getColorName());
		}
		return toReturn;
	}
}
