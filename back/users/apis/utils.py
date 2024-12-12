def extract_key(data, key):
    for item in data:
        if item["key"] == key:
            return item
    return None
