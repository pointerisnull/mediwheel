import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Account = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2']);

  const handleAddItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  return (
    <View>
      {items.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}

export default Account;