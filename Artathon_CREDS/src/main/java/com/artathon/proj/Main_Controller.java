package com.artathon.proj;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;


import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;


@RestController


public class Main_Controller {

	 private static String enactmentID;
	 private static String sessionID;

	 private int diag=0;
	 private static String dbAddress="clash.biomed.drexel.edu";
	 private static String dbPort="";
	 private static String dbName="influenza";
	 private static String dbUser="artathon";
	 private static String dbPassword="";
	 





	 
	 //singleton
	 private static Main_Controller controller = null;
	   public Main_Controller() {
		  
	      // Exists only to defeat instantiation.
	   }
	   public static Main_Controller getInstance() {
	      if(controller == null) {
	         controller = new Main_Controller();
	         
	      }
	      return controller;
	   }
/*
* Main method
* */
	public static void main(String[] args) {






	}
	@GetMapping("/")
	public RedirectView process(Model model, HttpSession session) {
		@SuppressWarnings("unchecked")
		List<String> users = (List<String>) session.getAttribute("USERS");

		if (users == null) {
			users = new ArrayList<>();
		}
		model.addAttribute("sessionUsers", users);
		RedirectView redirectView = new RedirectView();
		redirectView.setUrl("index.html");
		return redirectView;

	}



	@GetMapping("/getCloneById/{id}")
	public ArrayList<String> getCloneById(@PathVariable("id") String id) {

///commentfdjklsfjklsdfjkl
		Connection c = null;
		Statement stmt = null;
		ResultSet rs = null;
		ArrayList<String> results = new ArrayList<String>();
		String rsString = "EmptySTR";
		try {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			c = DriverManager
					.getConnection("jdbc:mysql://"+dbAddress+":"+dbPort+"/"+dbName+"?serverTimezone=UTC",
							dbUser, dbPassword);
			System.out.println("Opened database successfully");

			stmt = c.createStatement();
			String sql = "SELECT id, tree from clones where id='"+id+"'" ;
			rs = stmt.executeQuery(sql);
			while (rs.next())
			{
				System.out.print("Column 1 returned ");
				System.out.println(rs.getString(1)+"#"+rs.getString(2));

				results.add(rs.getString(1)+"#"+rs.getString(2));

			}
			//  rs.close();
			//  stmt.close();

		}  catch(JSONException e) {
			e.printStackTrace();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		System.out.println("wohooo");
		if (rs != null){
			try{
				rs.close();
				stmt.close();
			}
			catch(SQLException e){
				e.printStackTrace();
			}
		}
		if (c != null){
			try{
				c.close();
				stmt.close();
			}
			catch(SQLException e){
				e.printStackTrace();
			}
		}
		return results;


	}


	@GetMapping("/getReliableClones/")
	public ArrayList<String> getReliableClones() {

///comment
		Connection c = null;
		Statement stmt = null;
		ResultSet rs = null;
		ArrayList<String> results = new ArrayList<String>();
		String rsString = "EmptySTR";
		try {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			c = DriverManager
					.getConnection("jdbc:mysql://"+dbAddress+":"+dbPort+"/"+dbName+"?serverTimezone=UTC",
							dbUser, dbPassword);
			System.out.println("Opened database successfully");

			stmt = c.createStatement();
			String sql = " select clones.id, clones.subject_id, clones.functional,count(mutations) as mutations_num, overall_unique_cnt as unique_sequences, overall_instance_cnt as instances, overall_total_cnt as total_sequences from clones inner join clone_stats on clones.id=clone_stats.clone_id group by clone_stats.clone_id having count(distinct(sample_id))>1 ;";


			rs = stmt.executeQuery(sql);
			while (rs.next())
			{
				JSONObject obj = new JSONObject();
				obj.put("id",rs.getString(1));
				obj.put("subject_id",rs.getString(2));
				obj.put("functional",rs.getString(3));
				obj.put("mutations_num",rs.getString(4));
				obj.put("unique_sequences",rs.getString(5));
				obj.put("instances",rs.getString(6));
				obj.put("total_sequences",rs.getString(7));
				System.out.print("Column 1 returned ");
				System.out.println(obj.toString());

				results.add(obj.toString());

			}
			//  rs.close();
			//  stmt.close();

		}  catch(JSONException e) {
			e.printStackTrace();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		System.out.println("wohooo");
		if (rs != null){
			try{
				rs.close();
				stmt.close();
			}
			catch(SQLException e){
				e.printStackTrace();
			}
		}
		if (c != null){
			try{
				c.close();
				stmt.close();
			}
			catch(SQLException e){
				e.printStackTrace();
			}
		}
		return results;


	}



	public static String getDbAddress() {
		return dbAddress;
	}

	public static void setDbAddress(String dbAddress) {
		Main_Controller.dbAddress = dbAddress;
	}

	public static String getDbPort() {
		return dbPort;
	}

	public static void setDbPort(String dbPort) {
		Main_Controller.dbPort = dbPort;
	}

	public static String getDbName() {
		return dbName;
	}

	public static void setDbName(String dbName) {
		Main_Controller.dbName = dbName;
	}

	public static String getDbUser() {
		return dbUser;
	}

	public static void setDbUser(String dbUser) {
		Main_Controller.dbUser = dbUser;
	}

	public static String getDbPassword() {
		return dbPassword;
	}

	public static void setDbPassword(String dbPassword) {
		Main_Controller.dbPassword = dbPassword;
	}
}
