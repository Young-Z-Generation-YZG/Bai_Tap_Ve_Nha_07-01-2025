import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   FlatList,
} from 'react-native';
import React, { useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { cn } from '~/lib/utils';

type DropdownItem = {
   id: string;
   content: React.ReactNode; // Custom content for each dropdown item
   onPress: () => void; // Callback when item is selected
};

type DropdownProps = {
   items: DropdownItem[];
   placeholder?: string; // Text to show when nothing is selected
   containerStyles?: string;
   TextStyles?: string;
   iconSize?: number;
};

const AppDropdown = ({
   items,
   placeholder = 'Select an option',
   containerStyles,
   TextStyles,
   iconSize = 24,
}: DropdownProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

   const toggleDropdown = () => setIsOpen((prev) => !prev);

   const handleSelect = (item: DropdownItem) => {
      setSelectedItem(item);
      item.onPress(); // Trigger the item's callback
      setIsOpen(false); // Close dropdown after selection
   };

   return (
      <View style={styles.container} className={`${containerStyles}`}>
         {/* Dropdown Button */}
         <TouchableOpacity
            onPress={toggleDropdown}
            className="bg-[#F9F9F9] p-3 rounded-xl flex flex-row items-center justify-between"
         >
            <Text
               className={cn(
                  'font-TenorSans-Regular text-[#555] text-lg',
                  TextStyles,
               )}
            >
               {selectedItem ? selectedItem.content : placeholder}
            </Text>
            <FeatherIcon name="chevron-down" size={iconSize} />
         </TouchableOpacity>

         {/* Dropdown List */}
         {isOpen && (
            <View style={styles.dropdown} className="mt-1">
               {items.length > 0
                  ? items.map((item, index) => {
                       return (
                          <TouchableOpacity
                             key={item.id}
                             onPress={() => handleSelect(item)}
                             className="border-b border-gray-200"
                          >
                             <Text
                                className={cn(
                                   'font-TenorSans-Regular pr-5 pl-3 py-2',
                                )}
                             >
                                {item.content}
                             </Text>
                          </TouchableOpacity>
                       );
                    })
                  : null}
            </View>
         )}
      </View>
   );
};

// Tailwind-like styles
const styles = StyleSheet.create({
   container: {
      position: 'relative',
      width: '100%', // w-full
      // maxWidth: 300, // max-w-xs
   },
   dropdown: {
      position: 'absolute',
      top: 48, // Adjust based on button height (py-2.5 + border)
      left: 0,
      right: 0,
      backgroundColor: '#ffffff', // bg-white
      borderWidth: 1, // border
      borderColor: '#d1d5db', // border-gray-300
      borderRadius: 8, // rounded-md
      shadowColor: '#000', // shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 10, // Ensure it appears above other elements
   },
   list: {
      maxHeight: 200, // max-h-48 (roughly 200px)
   },
});

export default AppDropdown;
