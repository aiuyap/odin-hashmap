export function HashMap() {
  let capacity = 16;
  let loadFactor = 0.75;
  let buckets = new Array(capacity);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode % capacity;
  }

  function set(key, value) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (buckets[index]) {
      buckets[index].value = value;
    }
    buckets[index] = { key, value };
    if (length() >= capacity * loadFactor) {
      capacity *= 2;
      const copyBuckets = [...buckets];
      buckets = new Array(capacity);

      copyBuckets.forEach((item) => {
        set(item.key, item.value);
      });
    }
  }

  function get(key) {
    const index = hash(key);

    if (!buckets[index]) {
      return null;
    }
    return buckets[index].value;
  }

  function has(key) {
    const index = hash(key);

    if (!buckets[index]) {
      return false;
    }
    return true;
  }

  function remove(key) {
    const index = hash(key);

    if (!buckets[index]) {
      return false;
    }
    buckets.splice(index);
    return true;
  }

  function length() {
    let count = 0;
    buckets.forEach((item) => {
      if (item) count++;
    });
    return count;
  }

  function clear() {
    buckets = new Array(capacity);
  }

  function keys() {
    let keys = [];
    buckets.forEach((item) => {
      keys.push(item.key);
    });
    return keys;
  }

  function values() {
    let values = [];
    buckets.forEach((item) => {
      values.push(item.value);
    });
    return values;
  }

  function entries() {
    let entries = [];
    buckets.forEach((item) => {
      entries.push([item.key, item.value]);
    });
    return entries;
  }

  return { set, get, has, remove, length, clear, keys, values, entries };
}
