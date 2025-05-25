import csv
import json

def csv_to_json(csv_file, json_file):
    # Read CSV file
    with open(csv_file, 'r') as csvfile:
        # Create a CSV reader object
        csv_reader = csv.DictReader(csvfile)
        
        # Convert CSV data to a list of dictionaries
        data = list(csv_reader)
        print(data[:5])
        
    # Write JSON data
    with open(json_file, 'w') as jsonfile:
        # Convert CSV data to JSON format and write to JSON file
        json.dump(data, jsonfile, indent=4)

# Example usage:
csv_to_json('data_260525.csv', 'data_260525.json')
