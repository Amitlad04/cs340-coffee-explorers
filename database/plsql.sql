-- #############################
-- CREATE Customer
-- #############################

DROP PROCEDURE IF EXISTS sp_CreateCustomer;

DELIMITER //
CREATE PROCEDURE sp_CreateCustomer(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_street VARCHAR(50),
    IN p_city VARCHAR(50),
    IN p_state VARCHAR(2),
    IN p_zip VARCHAR(5),
    IN p_email VARCHAR(50),
    IN p_phone VARCHAR(10),
    OUT p_customer_id INT
)
BEGIN
    INSERT INTO `Customers` (first_name, last_name, street, city,
        state, zip, email, phone)
    VALUES (p_first_name, p_last_name, p_street, p_city, p_state, p_zip,
        p_email, p_phone);

    SELECT LAST_INSERT_ID() into p_customer_id;
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_UpdateCustomer;
DELIMITER // 
CREATE PROCEDURE sp_UpdateCustomer(
    IN p_customer_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_street VARCHAR(50),
    IN p_city VARCHAR(50),
    IN p_state VARCHAR(2),
    IN p_zip VARCHAR(5),
    IN p_email VARCHAR(50),
    IN p_phone VARCHAR(10)
    )
BEGIN
    UPDATE Customers SET first_name = p_first_name, last_name = p_last_name, street = p_street,
        city = p_city, state = p_state, zip = p_zip, email = p_email, phone = p_phone
        WHERE customer_id = p_customer_id;

END //
DELIMITER ; 

DROP PROCEDURE IF EXISTS sp_DeleteCustomer;
DELIMITER //
CREATE PROCEDURE sp_DeleteCustomer(IN p_customer_id INT)
BEGIN
    DECLARE error_message VARCHAR(255);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN 
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM PaymentMethods WHERE customer_id = p_customer_id;
        DELETE FROM Customers WHERE customer_id = p_customer_id;

        IF ROW_COUNT() = 0 THEN 
            SET error_message = CONCAT('No matching record found in Customers for customer_id: ', p_customer_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    COMMIT;
END //
DELIMITER ;
