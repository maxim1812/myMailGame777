
import java.io.*;
import java.util.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Helper 
{
	public static String url;
	public static String user;
	public static String password;
	
	public void initVariables()
	{
		System.out.println("Init variables of Helper class");
		
		url = "jdbc:mysql://localhost/b555";		
		user = "root";
		password = "";
	}
	
	public int correctLoginAndPassword(String login, String pass)
	{
		String query = "select * from u where u1 = '" + login + "' and  u2 = '" + pass + "' ORDER BY u0;";
		System.out.println(query);
		int answer = -1;
		
		try
	    {
	        Connection con = DriverManager.getConnection(url,user,password);
	        Statement stmt = con.createStatement();
	        ResultSet rs = stmt.executeQuery(query);
	        while (rs.next()) 
	        {
	        	answer = Integer.parseInt( rs.getString(1) );   
            }
	        
	        con.close();
	        stmt.close();
	        rs.close();
	    }
	    catch (Exception e1) 
	    {
	    	System.out.println("Error");
	    	e1.printStackTrace();
	    }	
		
		return answer;
	}
	
	public boolean isUserInDB(String login)
	{
		String query = "select * from u where u1 = '" + login + "' ORDER BY u0;";
		System.out.println(query);
		boolean answer = false;
	    
	    try
	    {
	        Connection con = DriverManager.getConnection(url,user,password);
	        Statement stmt = con.createStatement();
	        ResultSet rs = stmt.executeQuery(query);
	        while (rs.next()) 
	        {
	        	answer = true;
            }
	        
	        con.close();
	        stmt.close();
	        rs.close();
	    }
	    catch (Exception e1) 
	    {
	    	System.out.println("Error");
	    	e1.printStackTrace();
	    }	
	    
	    return answer;
	}
	
	public  void addUserToDB(String login, String pass)
	{
		String query = "insert into u (u1, u2) values ('"+ login + "','"+ pass + "');";	    
		System.out.println(query);
	    try
	    {
	        Connection con = DriverManager.getConnection(url,user,password);
	        Statement stmt = con.createStatement();
	        int rs = stmt.executeUpdate(query);	    	        
	        con.close();
	        stmt.close();
	    }
	    catch (Exception e1) 
	    {
	    	System.out.println("Error");
	    	e1.printStackTrace();
	    }	
	}
	
	
	public static void main(String[] args) 
	{

	}

}
