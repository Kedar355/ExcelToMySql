import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.File;
import java.io.FileInputStream;
import java.sql.*;
import java.text.SimpleDateFormat;

public class ExcelToDatabase {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/amazon_db";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static void main(String[] args) {
        String excelFilePath = "src/main/java/data.xlsx";

        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASSWORD);
                FileInputStream fis = new FileInputStream(new File(excelFilePath));
                Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);
            String insertQuery = "INSERT INTO transactions (txid, store, productid, title, category_id, category, sales, price, commission, order_date, pid, affid1, status, added_at, last_updated) "
                    +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
                SimpleDateFormat excelDateFormat = new SimpleDateFormat("yyyy-MM-dd");

                for (Row row : sheet) {
                    if (row.getRowNum() == 0)
                        continue; // Skip header row

                    pstmt.setString(1, getStringValue(row.getCell(0))); // txid
                    pstmt.setString(2, getStringValue(row.getCell(1))); // store
                    pstmt.setString(3, getStringValue(row.getCell(2))); // productid
                    pstmt.setString(4, getStringValue(row.getCell(3))); // title
                    pstmt.setInt(5, getNumericIntValue(row.getCell(4))); // category_id
                    pstmt.setString(6, getStringValue(row.getCell(5))); // category
                    pstmt.setDouble(7, getNumericDoubleValue(row.getCell(6))); // sales
                    pstmt.setDouble(8, getNumericDoubleValue(row.getCell(7))); // price
                    pstmt.setDouble(9, getNumericDoubleValue(row.getCell(8))); // commission

                    // Convert Excel date to SQL Date
                    pstmt.setDate(10, getDateValue(row.getCell(9)));

                    pstmt.setString(11, getStringValue(row.getCell(10))); // pid
                    pstmt.setString(12, getStringValue(row.getCell(11))); // affid1
                    pstmt.setString(13, getStringValue(row.getCell(12))); // status

                    // Convert timestamps
                    pstmt.setTimestamp(14, getTimestampValue(row.getCell(13))); // added_at
                    pstmt.setTimestamp(15, getTimestampValue(row.getCell(14))); // last_updated

                    pstmt.addBatch();
                }
                pstmt.executeBatch();
                System.out.println("Data imported successfully!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Helper method to safely get string value
    private static String getStringValue(Cell cell) {
        if (cell == null)
            return null;
        return cell.getCellType() == CellType.STRING ? cell.getStringCellValue()
                : String.valueOf((int) cell.getNumericCellValue());
    }

    // Helper method to safely get integer value
    private static int getNumericIntValue(Cell cell) {
        if (cell == null)
            return 0;
        return cell.getCellType() == CellType.NUMERIC ? (int) cell.getNumericCellValue()
                : Integer.parseInt(cell.getStringCellValue().trim());
    }

    // Helper method to safely get double value
    private static double getNumericDoubleValue(Cell cell) {
        if (cell == null)
            return 0.0;
        return cell.getCellType() == CellType.NUMERIC ? cell.getNumericCellValue()
                : Double.parseDouble(cell.getStringCellValue().trim());
    }

    // Helper method to safely get date value
    private static java.sql.Date getDateValue(Cell cell) {
        if (cell == null)
            return null;
        if (cell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(cell)) {
            return new java.sql.Date(cell.getDateCellValue().getTime());
        }
        return null;
    }

    // Helper method to safely get timestamp value
    private static Timestamp getTimestampValue(Cell cell) {
        if (cell == null)
            return null;
        if (cell.getCellType() == CellType.STRING) {
            return Timestamp.valueOf(cell.getStringCellValue().trim());
        }
        return null;
    }
}
