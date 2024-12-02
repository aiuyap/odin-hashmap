function HashMap() {
  let capacity = 16;
  let loadFactor = 0.75;
  let buckets = [];

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capcity;
    }

    return hashCode;
  }

  function set(key, value) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (buckets[index].key === key) {
      buckets[index].value = value;
    }

    buckets[index] = { key, value };
  }
}
