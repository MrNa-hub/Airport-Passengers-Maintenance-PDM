package vn.iuhcm.airport;

import vn.iuhcm.airport.employee.Employee;
import vn.iuhcm.airport.employee.EmployeeDAO;
import vn.iuhcm.airport.flight.Aircraft;
import vn.iuhcm.airport.flight.AircraftDAO;
import vn.iuhcm.airport.flight.Flight;
import vn.iuhcm.airport.flight.FlightDAO;
import vn.iuhcm.airport.flight.Assignee;
import vn.iuhcm.airport.flight.AssigneeDAO;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

public class MainTest {

    public static void main(String[] args) {

        EmployeeDAO employeeDAO = new EmployeeDAO();
        AircraftDAO aircraftDAO = new AircraftDAO();
        FlightDAO flightDAO = new FlightDAO();
        AssigneeDAO assigneeDAO = new AssigneeDAO();
        

        try {
            
            // 1. TEST EMPLOYEE
            //Test insert, delete
            System.out.println("=== INSERT EMPLOYEE ==="); 
            Employee emp1 = new Employee("EMP0001", "Nguyen Van A"); 
            Employee emp2 = new Employee("EMP0002", "Tran Thi B"); 
            employeeDAO.insert(emp1); 
            employeeDAO.insert(emp2);
            System.out.println(emp1);
            System.out.println(emp2);
            int rows1 = employeeDAO.delete("EMP0001");
            int rows2 = employeeDAO.delete("EMP0002");
            System.out.println("Deleted rows: " + rows1 + ", " + rows2); // nếu Deleted rows: 1, 1 nghĩa là đã xóa thành công
            /*
            //Test findAll()
            System.out.println("=== FIND ALL EMPLOYEE ===");
            List<Employee> employees = employeeDAO.findAll();
            for (Employee e : employees) {
                System.out.println(e);
            }
            */
            // 2. TEST AIRCRAFT
            // Test findAll
            /*
            System.out.println("=== FIND ALL AIRCRAFT ===");
            List<Aircraft> aircrafts = aircraftDAO.findAll();
            for (Aircraft a : aircrafts) {
                System.out.println(a);
            }
            //Test insert, delete
            System.out.println("=== INSERT AIRCRAFT ==="); 
            Aircraft air1 = new Aircraft("AD001","VN-TEST","Airbus A350",326,"Qatar Airways");
            Aircraft air2 = new Aircraft("AD002","VN-DEMO","Airbus A340",326,"VN Airways"); 
            aircraftDAO.insert(air1); 
            aircraftDAO.insert(air2);
            System.out.println(air1);
            System.out.println(air2);
            int rows1 = aircraftDAO.delete("AD001");
            int rows2 = aircraftDAO.delete("AD002");
            System.out.println("Deleted rows: " + rows1 + ", " + rows2); // nếu Deleted rows: 1, 1 nghĩa là đã xóa thành công
            */
            // 3. TEST FLIGHT
            
            /*
            System.out.println("=== FIND ALL FLIGHT ===");
            List<Flight> flights = flightDAO.findAll();
            for (Flight f : flights) {
                System.out.println(f);
            }
            */
            
             
            // 4. TEST ASSIGNEE (gán nhân viên vào chuyến bay)
            /*
            System.out.println("=== FIND ALL ASSIGNEE ===");
            List<Assignee> assignees = assigneeDAO.findAll();
            for (Assignee a : assignees) {
                System.out.println(a);
            }

            System.out.println("\n=== FIND ASSIGNEE BY FLIGHT FL0001 ===");
            List<Assignee> assigneesFL1 = assigneeDAO.findByFlight("FL0001");
            for (Assignee asg : assigneesFL1) {
                System.out.println(asg);
            }
            

            // 5. TEST findById
            System.out.println("\n=== FIND EMPLOYEE BY ID EMP001 ===");
            Employee eFound = employeeDAO.findById("EM00001");
            System.out.println(eFound);

            System.out.println("=== FIND FLIGHT BY ID FL0001 ===");
            Flight fFound = flightDAO.findById("FL0001");
            System.out.println(fFound);
            */
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
