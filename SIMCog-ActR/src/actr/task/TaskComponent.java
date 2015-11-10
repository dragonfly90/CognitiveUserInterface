package actr.task;

import java.awt.Point;
import java.util.Map;

public interface TaskComponent {
	/**
	 * Gets the kind of component (i.e., the "kind" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the kind string
	 */
	public String getKind();

	/**
	 * Gets the value of component (i.e., the "value" slot of the ACT-R visual
	 * object).
	 * 
	 * @return the value string
	 */
	public String getValue();
	
	/**
	 * Gets the values of "other slots" (e.g., the "color" slot of the ACT-R visual object).
	 * @return the value string
	 */
	public Map<String,String> getOtherSlots ();
	
	/**
	 * Determines if a point is contained in this component
	 * @param p the Point at which containment is tested
	 * @return true if p is contained in this TaskComponent; false otherwise
	 */
	public boolean isComponentAt(Point p);
}
