package actr.task.irrelevant.visuals;

import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JPanel;

public class TaskIrrelevantArrow extends JPanel {

	private static final long serialVersionUID = 1L;
	
	int xStart, yStart;
	int xEnd, yEnd;
	int xHead1, yHead1;
	int xHead2, yHead2;

	/**
	 * Creates an arrow
	 * @param x the x-coordinate of the upper-left corner of the enclosing rectangle
	 * @param y the y-coordinate of the upper-left corner of the enclosing rectangle
	 * @param width the width of the enclosing rectangle
	 * @param height the height of the enclosing rectangle
	 * @param horizontal if true, the arrow points left or right; if false, the arrow points up or down
	 * @param left if true, the arrow points left or down; if false, the arrow points right or up
	 * @param headOffset the number of pixels the arrowhead will stretch back, relative to the start of the line
	 * @param foreground the color of the arrow
	 * @param background the color of the rest of the enclosing rectangle
	 */
	public TaskIrrelevantArrow(int x, int y, int width, int height, int headOffset, boolean horizontal, boolean left, Color foreground, Color background)
	{
		super();
		setForeground(foreground);
		setBackground(background);
		setBounds(x, y, width, height);
		
		if(horizontal) {
			if(left) {
				xStart = 0;
				xEnd = width;
				yStart = yEnd = (int) (0.5f * height);
				xHead1 = xHead2 = headOffset;
				yHead1 = 0;
				yHead2 = height;
			} else {
				xStart = width;
				xEnd = 0;
				yStart = yEnd = (int) (0.5f * height);
				xHead1 = xHead2 = width - headOffset;
				yHead1 = 0;
				yHead2 = height;
			}
		} else {
			if(left) {
				xStart = xEnd = (int) (0.5f * width);
				yStart = height; 
				yEnd = 0;
				xHead1 = 0;
				xHead2 = width;
				yHead1 = yHead2 = height - headOffset;
			} else {
				xStart = xEnd = (int) (0.5f * width);
				yStart = 0; 
				yEnd = height;
				xHead1 = 0;
				xHead2 = width;
				yHead1 = yHead2 = headOffset;
			}
		}
	}

	protected void paintComponent(Graphics g)
	{
		g.setColor(this.getBackground());
		g.fillRect(0, 0, getWidth(), getHeight());
		
		g.setColor(this.getForeground());
		g.drawLine(xStart, yStart, xEnd, yEnd);
		g.drawLine(xStart, yStart, xHead1, yHead1);
		g.drawLine(xStart, yStart, xHead2, yHead2);
	}	
}
