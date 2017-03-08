

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


@WebServlet("/GameServlet")

public class GameServlet extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
    
    public GameServlet() 
    {
        super();    
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{	
		response.addHeader("Access-Control-Allow-Origin", "*");
		int type = Integer.parseInt(request.getParameter("type"));
		Helper h = new Helper();
		h.initVariables();
		
		if(type == 1)
		{
			String login = request.getParameter("login") + "";
			String password = request.getParameter("password") + "";
			
			if(h.isUserInDB(login) == true)
			{
				System.out.println("NO REGISTRATION");
				response.getWriter().append("NO").append(request.getContextPath());
			}
			else
			{
				System.out.println("YES REGISTRATION");
				h.addUserToDB(login, password);
				response.getWriter().append("YES").append(request.getContextPath());
			}
		}
		
		if(type == 2)
		{
			String login = request.getParameter("login") + "";
			String password = request.getParameter("password") + "";
			
			int number = h.correctLoginAndPassword(login, password);
			
			if(number != -1)
				response.getWriter().append("YES").append(request.getContextPath());
			else
				response.getWriter().append("NO").append(request.getContextPath());			
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doGet(request, response);
	}
}

