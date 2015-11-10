package actr.task.irrelevant.visuals;

import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JPanel;

public class TaskIrrelevantLine extends JPanel
{
	private static final long serialVersionUID = 1L;

	public TaskIrrelevantLine(int x, int y, int width, int height, Color color)
	{
		super();
		setForeground (color);
		setBounds(x, y, width, height);
	}

	protected void paintComponent (Graphics g)
	{
		g.setColor (this.getForeground());
		g.fillRect (0, 0, getWidth(), getHeight());
	}
}