# Sparks-technology-
Sparks technology practical questions and answers with source code 


from docx import Document



# Create a Word document

doc = Document()

doc.add_heading("Optimized Practical Codes for Spark", level=1)



# Practical 2

doc.add_heading("Practical 2: Filtering RDDs and Finding Minimum Temperature by Location", level=2)

doc.add_paragraph("""

from pyspark import SparkConf, SparkContext



# Initialize Spark

conf = SparkConf().setMaster("local").setAppName("MinTemperature")

sc = SparkContext(conf=conf)



# Function to parse lines

def parseLine(line):

    fields = line.split(',')

    return fields[0], fields[2], float(fields[3]) * 0.1 * (9/5) + 32



# Load data and filter TMIN records

lines = sc.textFile("1800.csv")

minTemps = (

    lines.map(parseLine)

    .filter(lambda x: x[1] == "TMIN")

    .map(lambda x: (x[0], x[2]))

    .reduceByKey(min)

)



# Show results

for station, temp in minTemps.collect():

    print(f"{station}\\t{temp:.2f}F")

""")



# Practical 3

doc.add_heading("Practical 3: Counting Word Occurrences using flatMap", level=2)

doc.add_paragraph("""

from pyspark import SparkConf, SparkContext



# Initialize Spark

conf = SparkConf().setMaster("local").setAppName("WordCount")

sc = SparkContext(conf=conf)



# Load data and count words

lines = sc.textFile("text.txt")

wordCounts = (

    lines.flatMap(lambda line: line.split())

    .map(lambda word: (word, 1))

    .reduceByKey(lambda x, y: x + y)

)



# Show results

for word, count in wordCounts.collect():

    print(f"{word}: {count}")

""")



# Practical 4

doc.add_heading("Practical 4: Executing SQL Commands on DataFrames", level=2)

doc.add_paragraph("""

from pyspark.sql import SparkSession



# Initialize SparkSession

spark = SparkSession.builder.appName("SQLCommands").getOrCreate()



# Load data into DataFrame

df = spark.read.csv("data.csv", header=True, inferSchema=True)



# Register DataFrame as SQL table

df.createOrReplaceTempView("data")



# Execute SQL queries

result = spark.sql("SELECT column1, column2 FROM data WHERE column3 > 100")



# Show results

result.show()

""")



# Practical 5

doc.add_heading("Practical 5: Total Spent by Customer with DataFrames", level=2)

doc.add_paragraph("""

from pyspark.sql import SparkSession



# Initialize SparkSession

spark = SparkSession.builder.appName("TotalSpent").getOrCreate()



# Load data into DataFrame

df = spark.read.csv("customer-orders.csv", header=False, inferSchema=True)

df = df.withColumnRenamed("_c0", "CustomerID").withColumnRenamed("_c2", "Amount")



# Calculate total spent

totalSpent = df.groupBy("CustomerID").sum("Amount").withColumnRenamed("sum(Amount)", "TotalSpent")



# Show results

totalSpent.show()

""")



# Practical 6

doc.add_heading("Practical 6: Use Broadcast Variables for Movie Names", level=2)

doc.add_paragraph("""

from pyspark import SparkConf, SparkContext



# Initialize Spark

conf = SparkConf().setMaster("local").setAppName("BroadcastMovieNames")

sc = SparkContext(conf=conf)



# Load movie names into a dictionary

movieNames = {1: "Toy Story", 2: "Jumanji", 3: "Grumpier Old Men"}

broadcastMovieNames = sc.broadcast(movieNames)



# Load data and map movie IDs to names

lines = sc.textFile("ratings.csv")

movies = lines.map(lambda x: int(x.split(',')[1])).map(lambda id: broadcastMovieNames.value.get(id, "Unknown"))



# Show results

for movie in movies.collect():

    print(movie)

""")



# Practical 7

doc.add_heading("Practical 7: Using Spark ML for Movie Recommendations", level=2)

doc.add_paragraph("""

from pyspark.sql import SparkSession

from pyspark.ml.recommendation import ALS



# Initialize SparkSession

spark = SparkSession.builder.appName("MovieRecommendation").getOrCreate()



# Load data into DataFrame

data = spark.read.csv("ratings.csv", header=True, inferSchema=True)



# Prepare ALS model

als = ALS(maxIter=5, regParam=0.01, userCol="userId", itemCol="movieId", ratingCol="rating")

model = als.fit(data)



# Make recommendations for all users

recommendations = model.recommendForAllUsers(5)



# Show results

recommendations.show()

""")



# Practical 8

doc.add_heading("Practical 8: Structured Streaming with Most-Viewed URLs", level=2)

doc.add_paragraph("""

from pyspark.sql import SparkSession



# Initialize SparkSession

spark = SparkSession.builder.appName("StructuredStreaming").getOrCreate()



# Read streaming data

stream = spark.readStream.format("socket").option("host", "localhost").option("port", 9999).load()



# Process data

urls = stream.selectExpr("CAST(value AS STRING)").groupBy("value").count()



# Write streaming results to console

query = urls.writeStream.outputMode("complete").format("console").start()

query.awaitTermination()

""")



# Save the document

file_path = "/mnt/data/Spark_Practicals_Optimized.docx"

doc.save(file_path)

file_path












**README: Spark Technology Practical Questions and Answers with Source Code**  

# Apache Spark Practical Solutions  

This repository contains **optimized practical solutions** for common tasks in **Apache Spark**. Designed for students, developers, and data enthusiasts, these practicals include clean, efficient, and exam-friendly source code for Spark-based operations.  

By following these examples, you can gain hands-on experience with Spark's **RDDs**, **DataFrames**, **SQL queries**, and **MLlib**, helping you excel in exams, projects, and interviews.  

---

## **Practical Questions Covered**  

### **2. Filtering RDDs and Finding Minimum Temperature by Location**  
- Learn how to filter and process RDDs to find minimum temperatures for specific locations using Spark.  
- Concepts: RDD transformations, filtering, and `reduceByKey`.  

### **3. Counting Word Occurrences Using flatMap()**  
- Implement word count efficiently with Spark’s `flatMap()`.  
- Concepts: Text processing, RDD operations, and `reduceByKey`.  

### **4. Executing SQL Commands on DataFrames**  
- Use Spark SQL to query structured data from CSV files.  
- Concepts: DataFrame creation, SQL-style queries, and schema inference.  

### **5. Calculate Total Spent by Customers**  
- Aggregate and calculate customer spending using Spark DataFrames.  
- Concepts: `groupBy()`, sum operations, and column renaming.  

### **6. Using Broadcast Variables to Display Movie Names Instead of IDs**  
- Map movie IDs to names efficiently using broadcast variables.  
- Concepts: Data broadcasting, dictionary mapping, and RDD transformations.  

### **7. Using Spark ML to Produce Movie Recommendations**  
- Implement collaborative filtering to recommend movies with Spark MLlib.  
- Concepts: ALS (Alternating Least Squares) algorithm, training models, and generating recommendations.  

### **8. Structured Streaming to Track Most-Viewed URLs**  
- Real-time URL tracking using Spark Structured Streaming.  
- Concepts: Streaming DataFrames, grouping, and query management.  

---

## **Features**  
- **Optimized Code**: Clean, minimal, and exam-ready Spark scripts.  
- **Comprehensive Examples**: Covers real-world use cases to help you master Spark concepts.  
- **SEO Optimized**: Ideal for learners searching for "Apache Spark practical questions and answers" or "Spark practical exam solutions."  
- **Hands-On Learning**: Explore Spark RDDs, DataFrames, SQL, and MLlib with real examples.  

---

## **Technology Stack**  
- **Apache Spark**  
- **Python**  
- **PySpark**  
- **Structured Streaming**  

---

## **Getting Started**  
1. Clone this repository:  
   ```bash  
   git clone https://github.com/your-repo/spark-practical-questions  
   ```  
2. Install dependencies:  
   - Python 3.x  
   - Apache Spark  
   - PySpark library  
3. Run each script as described in the respective files.  

---

## **Why Choose This Repository?**  
- **Exam Preparation**: Specifically tailored for Spark practical exams.  
- **Real-World Relevance**: Solve real-world problems with Spark.  
- **SEO Friendly**: Find this repository easily with search terms like "optimized Spark exam solutions" and "PySpark practical codes."  

---

Contribute to this repository by suggesting improvements or sharing new practical use cases!  

**Star this repository** if it helped you in your learning journey!  
