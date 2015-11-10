package actr.task;

import java.awt.BasicStroke;
import java.awt.Graphics;
import java.awt.Graphics2D;

/**
 * The class that defines a rectangle that is not filled, but has a boundary
 * that can be up to max(width, height) / 2 - 1.
 * For a completely filled rectangle, TaskRectangle or TaskLine should be used.
 * 
 * @author Tim Halverson
 */
public class TaskRectangleBorder extends TaskLine {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected int thickness;

	public TaskRectangleBorder(int x, int y, int width, int height, int thickness, NamedColor color) {
		super(x, y, width, height, color);
		
		this.thickness = thickness;
		
		if(this.thickness > Math.floor(this.getWidth() / 2)) {
			this.thickness = (int) Math.floor(this.getWidth() / 2);
		}
		if(this.thickness > Math.floor(this.getHeight() / 2)) {
			this.thickness = (int) Math.floor(this.getHeight() / 2);
		}
	}

	public TaskRectangleBorder(int x, int y, int width, int height, int thickness) {
		this(x, y, width, height, thickness, NamedColor.BLACK);
	}

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual object).
	 * @return the value string
	 */
	@Override
	public String getValue () { return Integer.toString(this.thickness); }

	protected void paintComponent (Graphics g)
	{		
		Graphics2D g2 = (Graphics2D)g;
		g2.setColor (this.getForeground());
		g2.setStroke(new BasicStroke(this.thickness));
		g2.drawRect(this.thickness/2, this.thickness/2, getWidth() - this.thickness, getHeight() - this.thickness);
	}
}
