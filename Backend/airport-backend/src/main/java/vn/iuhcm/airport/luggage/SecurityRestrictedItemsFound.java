package vn.iuhcm.airport.luggage;

public class SecurityRestrictedItemsFound {

    public String securityLogID; // Composite Primary Key (FK to Security)
    public String restrictedItemFound; // Composite Primary Key

    // Constructor rỗng (Jackson cần)
    public SecurityRestrictedItemsFound() {
    }

    // Constructor đầy đủ
    public SecurityRestrictedItemsFound(String securityLogID, String restrictedItemFound) {
        this.securityLogID = securityLogID;
        this.restrictedItemFound = restrictedItemFound;
    }
}