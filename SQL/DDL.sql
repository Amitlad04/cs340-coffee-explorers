DROP PROCEDURE IF EXISTS sp_load_coffeedb;
DELIMITER //
CREATE PROCEDURE sp_load_coffeedb()
BEGIN  

    SET FOREIGN_KEY_CHECKS=0;

    DROP TABLE IF EXISTS `Coffees`;

    CREATE TABLE IF NOT EXISTS `Coffees` (
    `coffee_id` int(11) NOT NULL,
    `name` varchar(50) NOT NULL,
    `price` decimal(5,2) NOT NULL,
    `origin` varchar(50) DEFAULT NULL,
    `roast_level` varchar(30) DEFAULT NULL,
    `flavor_notes` varchar(500) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    --
    -- Dumping data for table `Coffees`
    --

    INSERT INTO `Coffees` (`coffee_id`, `name`, `price`, `origin`, `roast_level`, `flavor_notes`) VALUES
    (1, 'Finca San Luis', 18.49, 'El Salvador', 'Medium-Dark', 'Pulpy fruit notes bring a rustic edge to deep, low toned bittersweetness, while low-acid and thick body help keep the focus on the intense cup flavors. Plum wine, dried date, dark cocoa, Brazil nut.'),
    (2, 'Acatenango Gesha', 24.99, 'Guatemala', 'Light', 'A lightly floral cup with refined sweetness, top notes of fruit and spice, hints of raw cane sugar, simple syrup, honey, jasmine pearl tea, apple, pear, tartaric acidity, whole cardamom and Allspice.'),
    (3, 'Uraga Yabitu Koba', 20.24, 'Ethiopia', 'Medium', 'The cup has many features of both wet and dry process coffees, dynamic fruit flavors, clean sweetness, hefty body, grabby citrus aspect in the top end, floral hint, and dried Turkish apricot.');

    -- --------------------------------------------------------

    --
    -- Table structure for table `Customers`
    --
    DROP TABLE IF EXISTS `Customers`;

    CREATE TABLE IF NOT EXISTS `Customers` (
    `customer_id` int(11) NOT NULL,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    `street` varchar(50) NOT NULL,
    `city` varchar(50) NOT NULL,
    `state` varchar(2) NOT NULL,
    `zip` varchar(5) NOT NULL,
    `email` varchar(50) NOT NULL,
    `phone` varchar(10) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    --
    -- Dumping data for table `Customers`
    --

    INSERT INTO `Customers` (`customer_id`, `first_name`, `last_name`, `street`, `city`, `state`, `zip`, `email`, `phone`) VALUES
    (1, 'Jane', 'Doe', '750 Baker St', 'Portland', 'OR', '97035', 'jane.doe@customer.com', '6035555522'),
    (2, 'John', 'Smith', '2474 Pine St', 'Eugene', 'OR', '97401', 'john.smith@customer.com', '5415433456'),
    (3, 'Lane', 'Johnson', '146 Main St', 'Phoenix', 'OR', '97535', 'lane.johnson@customer.com', '5032551234');

    -- --------------------------------------------------------

    --
    -- Table structure for table `Orders`
    --
    DROP TABLE IF EXISTS `Orders`;

    CREATE TABLE IF NOT EXISTS `Orders` (
    `order_id` int(11) NOT NULL,
    `order_time_date` datetime NOT NULL,
    `customer_id` int(11) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    --
    -- Dumping data for table `Orders`
    --

    INSERT INTO `Orders` (`order_id`, `order_time_date`, `customer_id`) VALUES
    (1, '2024-11-23 00:00:00', 1),
    (2, '2024-12-20 00:00:00', 2),
    (3, '2025-01-05 00:00:00', 3);

    -- --------------------------------------------------------

    --
    -- Table structure for table `Orders_has_Coffees`
    --
    DROP TABLE IF EXISTS `OrdersCoffees`;

    CREATE TABLE IF NOT EXISTS `OrdersCoffees` (
    `line_item_id` int(11) NOT NULL,
    `order_id` int(11) NOT NULL,
    `coffee_id` int(11) NOT NULL,
    `qty` int(11) NOT NULL DEFAULT 1,
    `price_at_order` decimal(6,2) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    --
    -- Dumping data for table `Orders_has_Coffees`
    --

    INSERT INTO `OrdersCoffees` (`line_item_id`, `order_id`, `coffee_id`, `qty`, `price_at_order`) VALUES
    (1, 1, 1, 2, 18.49),
    (2, 1, 2, 1, 24.99),
    (3, 1, 3, 1, 20.24),
    (4, 2, 1, 2, 18.49),
    (5, 2, 3, 3, 20.24),
    (6, 3, 1, 2, 18.49),
    (7, 3, 2, 3, 24.99),
    (8, 3, 3, 1, 20.24);

    -- --------------------------------------------------------

    --
    -- Table structure for table `PaymentMethods`
    --
    DROP TABLE IF EXISTS `PaymentMethods`;

    CREATE TABLE IF NOT EXISTS `PaymentMethods` (
    `payment_method_id` int(11) NOT NULL,
    `number` varchar(16) NOT NULL,
    `cvv` varchar(4) NOT NULL,
    `name` varchar(50) NOT NULL,
    `customer_id` int(11) NOT NULL,
    `expiration` date NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    --
    -- Dumping data for table `PaymentMethods`
    --

    INSERT INTO `PaymentMethods` (`payment_method_id`, `number`, `cvv`, `name`, `customer_id`, `expiration`) VALUES
    (1, '1234432156788765', '555', 'John Doe', 1, '2026-11-30'),
    (2, '4567432155558765', '151', 'John Smith', 2, '2028-01-31'),
    (3, '4321555545678765', '891', 'Lane Johnson', 3, '2029-07-31');

    --
    -- Indexes for dumped tables
    --

    --
    -- Indexes for table `Coffees`
    --
    ALTER TABLE `Coffees`
    ADD PRIMARY KEY (`coffee_id`),
    ADD UNIQUE KEY `idnew_table_UNIQUE` (`coffee_id`);

    --
    -- Indexes for table `Customers`
    --
    ALTER TABLE `Customers`
    ADD PRIMARY KEY (`customer_id`),
    ADD UNIQUE KEY `customer_id_UNIQUE` (`customer_id`);

    --
    -- Indexes for table `Orders`
    --
    ALTER TABLE `Orders`
    ADD PRIMARY KEY (`order_id`),
    ADD UNIQUE KEY `order_id_UNIQUE` (`order_id`),
    ADD KEY `fk_Orders_Customers1_idx` (`customer_id`);

    --
    -- Indexes for table `OrdersCoffees`
    --
    ALTER TABLE `OrdersCoffees`
    ADD PRIMARY KEY (`line_item_id`),
    ADD KEY `fk_OrdersCoffees_Coffees1_idx` (`coffee_id`),
    ADD KEY `fk_OrdersCoffees_Orders_idx` (`order_id`);

    --
    -- Indexes for table `PaymentMethods`
    --
    ALTER TABLE `PaymentMethods`
    ADD PRIMARY KEY (`payment_method_id`),
    ADD UNIQUE KEY `payment_method_id_UNIQUE` (`payment_method_id`),
    ADD UNIQUE KEY `customer_id_UNIQUE` (`customer_id`),
    ADD KEY `fk_PaymentMethods_Customers1_idx` (`customer_id`);

    --
    -- AUTO_INCREMENT for dumped tables
    --

    --
    -- AUTO_INCREMENT for table `Coffees`
    --
    ALTER TABLE `Coffees`
    MODIFY `coffee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

    --
    -- AUTO_INCREMENT for table `Customers`
    --
    ALTER TABLE `Customers`
    MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

    --
    -- AUTO_INCREMENT for table `Orders`
    --
    ALTER TABLE `Orders`
    MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

    --
    -- AUTO_INCREMENT for table `OrdersCoffees`
    --
    ALTER TABLE `OrdersCoffees`
    MODIFY `line_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

    --
    -- AUTO_INCREMENT for table `PaymentMethods`
    --
    ALTER TABLE `PaymentMethods`
    MODIFY `payment_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

    --
    -- Constraints for dumped tables
    --

    --
    -- Constraints for table `Orders`
    --
    ALTER TABLE `Orders`
    ADD CONSTRAINT `fk_Orders_Customers1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

    --
    -- Constraints for table `Orders_has_Coffees`
    --
    ALTER TABLE `OrdersCoffees`
    ADD CONSTRAINT `fk_OrdersCoffees_Coffees1` FOREIGN KEY (`coffee_id`) REFERENCES `Coffees` (`coffee_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
    ADD CONSTRAINT `fk_OrdersCoffees_Orders` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE `OrdersCoffees`
    ADD CONSTRAINT unique_order_coffee UNIQUE (order_id, coffee_id);

    --
    -- Constraints for table `PaymentMethods`
    --
    ALTER TABLE `PaymentMethods`
    ADD CONSTRAINT `fk_PaymentMethods_Customers1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

    SET FOREIGN_KEY_CHECKS=1;
END //
DELIMITER ; 
