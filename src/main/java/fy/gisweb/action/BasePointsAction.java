package fy.gisweb.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class BasePointsAction extends ActionSupport {
	private HttpServletRequest request;
	private HttpServletResponse response;

	// private BasePoints basePoints;
	// private BasePointsService basePointsService;
	public String BasePoints() {
		request = ServletActionContext.getRequest();
		try {
			System.out.println(request.getInputStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// Array[] rings = requests
		
		// List<BasePoints> data = basePointsService.generateBasePoints(rings);
		return SUCCESS;
	}

}
