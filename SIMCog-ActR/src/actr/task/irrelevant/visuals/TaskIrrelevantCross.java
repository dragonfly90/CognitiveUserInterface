package actr.task.irrelevant.visuals;

import javax.swing.JPanel;
import java.awt.*;

public class TaskIrrelevantCross extends JPanel
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	int size;

	public TaskIrrelevantCross(int x, int y, int size, Color color) 
	{
		super();
		this.size = size;
		setForeground (color);
		setBounds (x, y, size, size);
	}
		
	protected void paintComponent (Graphics g)
	{
		g.setColor (this.getForeground());
		int cx = size/2;
		int cy = size/2;
		g.drawLine (0, cy, size, cy);
		g.drawLine (cx, 0, cx, size);
	}
}
