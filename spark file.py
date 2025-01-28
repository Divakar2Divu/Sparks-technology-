Python 3.13.1 (tags/v3.13.1:0671451, Dec  3 2024, 19:06:28) [MSC v.1942 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license()" for more information.
>>> 
... # Practical 2: Spark Basics and RDD Interface
... from pyspark import SparkContext, SparkConf
... 
... # Initialize SparkContext
... conf = SparkConf().setAppName("SparkBasicsAndRDD").setMaster("local[*]")
... sc = SparkContext(conf=conf)
... 
... # Create an RDD from a list
... data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
... rdd = sc.parallelize(data)
... 
... # Map and Filter operations
... mapped_rdd = rdd.map(lambda x: x * 2)
... filtered_rdd = mapped_rdd.filter(lambda x: x % 2 == 0)
... 
... # Collect results
... result = filtered_rdd.collect()
... print("Transformed and Filtered RDD Elements:", result)
... sc.stop()
... 
... # Practical 3: Filtering RDDs and Finding Min/Max Temperature by Location (CSV File)
... from pyspark.sql import SparkSession
... from pyspark.sql.functions import min, max
... from pyspark.sql.types import StructType, StructField, StringType, IntegerType
... 
... spark = SparkSession.builder.appName("MinMaxTemperatureByLocation").getOrCreate()
... 
... # Define schema for the CSV data
... schema = StructType([
...     StructField("Location", StringType(), True),
...     StructField("Temperature", IntegerType(), True)
... ])
... 
... # Load data from CSV file
file_path = "path/to/temperature_data.csv"  # Replace with your CSV file path
df = spark.read.csv(file_path, schema=schema, header=True)

# Calculate minimum and maximum temperatures by location
min_max_temps = df.groupBy("Location").agg(
    min("Temperature").alias("MinTemperature"),
    max("Temperature").alias("MaxTemperature")
)

# Show results
min_max_temps.show()

# Save results to a CSV file
output_path = "path/to/output_min_max_temps.csv"  # Replace with your desired output path
min_max_temps.write.csv(output_path, header=True, mode="overwrite")

spark.stop()

# Practical 4: Counting Word Occurrences using flatMap() (CSV File)
file_path = "path/to/text_data.csv"  # Replace with your CSV file path
rdd = sc.textFile(file_path)

# Word count
word_counts = (rdd.flatMap(lambda line: line.split())
               .map(lambda word: (word, 1))
               .reduceByKey(lambda x, y: x + y))

result = word_counts.collect()
print("Word counts:", result)
sc.stop()

# Practical 5: Executing SQL Commands and SQL-Style Functions on a DataFrame (CSV File)
spark = SparkSession.builder.appName("SQLCommandsOnDataFrame").getOrCreate()

file_path = "path/to/people_data.csv"  # Replace with your CSV file path
df = spark.read.csv(file_path, header=True, inferSchema=True)
df.createOrReplaceTempView("people")

result = spark.sql("SELECT * FROM people WHERE Age > 30")
result.show()
spark.stop()

# Practical 6: Implement Total Spent by Customer with DataFrames (CSV File)
spark = SparkSession.builder.appName("TotalSpentByCustomer").getOrCreate()

file_path = "path/to/spending_data.csv"  # Replace with your CSV file path
df = spark.read.csv(file_path, header=True, inferSchema=True)

total_spent = df.groupBy("CustomerID").sum("AmountSpent")
total_spent.show()

output_path = "path/to/output_total_spent.csv"  # Replace with your desired output path
total_spent.write.csv(output_path, header=True, mode="overwrite")

spark.stop()

# Practical 7: Use Broadcast Variables to Display Movie Names Instead of ID Numbers
conf = SparkConf().setAppName("BroadcastVariables").setMaster("local[*]")
sc = SparkContext(conf=conf)

movie_names = {1: "Inception", 2: "Interstellar", 3: "Dunkirk"}
broadcast_var = sc.broadcast(movie_names)

file_path = "path/to/movies_data.csv"  # Replace with your CSV file path
data_rdd = sc.textFile(file_path).map(lambda line: tuple(map(int, line.split(","))))

movies_with_names = data_rdd.map(lambda x: (broadcast_var.value[x[0]], x[1]))
result = movies_with_names.collect()
print("Movies with Names and Ratings:", result)
sc.stop()

# Practical 8: Using Spark ML to Produce Movie Recommendations (CSV File)
from pyspark.ml.recommendation import ALS

spark = SparkSession.builder.appName("MovieRecommendationsFromCSV").getOrCreate()

file_path = "path/to/ratings_data.csv"  # Replace with your CSV file path
df = spark.read.csv(file_path, header=True, inferSchema=True)

als = ALS(userCol="UserID", itemCol="MovieID", ratingCol="Rating", nonnegative=True)
model = als.fit(df)

recommendations = model.recommendForAllUsers(3)

output_path = "path/to/output_recommendations.csv"  # Replace with your desired output path
recommendations.write.csv(output_path, header=True, mode="overwrite")
recommendations.show(truncate=False)

spark.stop()

# Practical 9: Use Windows with Structured Streaming to Track Most-Viewed URLs (CSV File)
from pyspark.sql.functions import window, count

spark = SparkSession.builder.appName("StructuredStreamingWindowFromCSV").getOrCreate()

file_path = "path/to/url_data.csv"  # Replace with your CSV file path
schema = StructType([
    StructField("URL", StringType(), True),
    StructField("timestamp", StringType(), True)
])

df = spark.read.csv(file_path, schema=schema, header=True)
windowed_counts = (df
                   .groupBy(window(df["timestamp"], "5 minutes"), "URL")
                   .agg(count("URL").alias("view_count")))

output_path = "path/to/output_url_counts.csv"  # Replace with your desired output path
windowed_counts.write.csv(output_path, header=True, mode="overwrite")
windowed_counts.show(truncate=False)

spark.stop()
