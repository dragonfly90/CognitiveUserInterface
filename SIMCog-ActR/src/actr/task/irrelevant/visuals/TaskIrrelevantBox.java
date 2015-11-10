package actr.task.irrelevant.visuals;

import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JPanel;

public class TaskIrrelevantBox extends JPanel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int thickness;

	public TaskIrrelevantBox (int x, int y, int width, int height, int thickness, Color color)
	{
		super();
		this.thickness = thickness;
		setForeground (color);
		setBounds (x, y, width, height);
	}

	protected void paintComponent (Graphics g)
	{
		g.setColor (this.getForeground());
		for(int i = 0; i < this.thickness; i++) {
			g.drawRect (i, i, getWidth() - (2*i), getHeight() - (2*i));
		}
	}
}
