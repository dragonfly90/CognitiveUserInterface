package actr.task.irrelevant.visuals;

import java.awt.Color;

import javax.swing.JLabel;

public class TaskIrrelevantLabel extends JLabel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public TaskIrrelevantLabel (String text, int x, int y, int width, int height, Color color) 
	{
		this(text, x, y, width, height, color, Color.BLACK);
	}

	public TaskIrrelevantLabel (String text, int x, int y, int width, int height, Color foreground, Color background) 
	{
		super(text);

		this.setOpaque(true);
		
		setForeground(foreground);
		setBackground(background);
		setBounds (x, y, width, height);
		setHorizontalAlignment (JLabel.CENTER);
		setVerticalAlignment (JLabel.CENTER);
	}
}
