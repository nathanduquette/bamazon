// Create a MySQL Database called bamazon.

// Then create a Table inside of that database called products.

// The products table should have each of the following columns:

// item_id (unique id for each product)

// product_name (Name of product)

// department_name

// price (cost to customer)

// stock_quantity (how much of the product is available in stores)

// Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.


// parce foat to add stock second part

// insert into table name 
// inquirer prompt
// 

var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');

// connection information
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "test",
    database: "bamazon_DB"
});

connection.connect(function(err) {
	if (err) throw err
	else{
		console.log("lolololol");
	}
});

connection.query("select id, product_name, departmant_name, price from products", function(err, res) {

 	if (err) throw err 
 	console.log("Bamazon");

	for ( var i = 0; i < res.length; i++){
		console.log("Item ID = " + res[i].id + " | " + res[i].product_name + " | " + "Department - " + res[i].departmant_name + " | " + "Price $ = " + res[i].price);
	};
	start();
});




function start() {




	inquirer.prompt([
		{
			name: "id",
			type: "input",
			message: "select the id of the product you would like."
		},
		{
			name: "quantity",
			type: "input",
			message: "select the amount you would like purchase."
		}
	]).then(function(input){
		var query = "SELECT stock_quantity, price FROM products WHERE id = ?";
		connection.query(query, [input.id], function(err, res) {
			console.log(res);
			if (res[0].stock_quantity >= input.quantity) {
				var dpmnt = res[0].departmant_name;
				var total = input.quantity * res[0].price;
				var newQuantity = res[0].stock_quantity - input.quantity;

				var query2 = "UPDATE products SET ? WHERE id = ?";
				connection.query(query2, [{stock_quantity: newQuantity}, {id: input.id}],
					function(err, res) {
						if (err) throw err
						console.log("your total is $" + total + " monies!");
					})


			}
		})
	})
}

// update products set stock_quantity = 10 where id = 1;
// .then(function(answer) {

//         var query = "SELECT departmant_name, stock_quantity, price FROM products WHERE ?"
//         connection.query(query, { ItemID: answer.id }, function(err, res) {

//             if (res[0].stock_quantity >= answer.quantity) {

//                 var dept = res[0].department_name;
//                 var updatedQuantity = res[0].StockQuantity - answer.quantity;
//                 var purchasePrice = (answer.quantity * res[0].Price).toFixed(2);

//                 var query2 = " UPDATE products SET ? WHERE ?";
                // connection.query(query2, [{ StockQuantity: updatedQuantity }, { ItemID: answer.id }],

//                     function(err, res) {

//                         if (err) throw err;
//                         console.log("Success! Your total is $" + purchasePrice);

//                     });



//                 var query3 = "SELECT TotalSales FROM Departments WHERE ?"
//                 connection.query(query3, { DepartmentName: dept }, function(err, data) {

//                     if (err) throw err

//                     var currentSales = data[0].TotalSales;
//                     var adjustedSales = currentSales + parseFloat(purchasePrice);





//                     var query4 = "UPDATE Departments SET ? WHERE ? "
//                     connection.query(query4, [{ TotalSales: adjustedSales }, { DepartmentName: dept }], function(err, data) {

//                         if (err) throw err
//                         start();


//                     })

//                 })

//             } else {
//                 console.log("Sorry, there are ".bold + res[0].StockQuantity + " units in stock for this product".bold);
//                 console.log("\n-----------------------------------------\n");

//                 start();

//             }

            

//         })

//     })
// }
