import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import React from 'react';
import {
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { cn } from '~/lib/utils';
import { NotificationType } from '~/src/infrastructure/types/notification.type';
import { format } from 'date-fns';

export interface NotifyItemProps {
    onPress: () => void;
    item: NotificationType;
};

const {height: SCREENHEIGHT, width: SCREENWIDTH} = Dimensions.get('screen');

const NotifyItem = (props: NotifyItemProps) => {
    // Extract notification type once
    const { item } = props;
    const type = item.type;
    
    // Format date if available, otherwise use a placeholder
    const dateString = item.createdAt 
        ? format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')
        : 'Unknown date';
    
    // Get notification-specific information based on type
    let title = '';
    let message = '';
    
    if (type === 'INVOICE') {
        title = item.invoice_info.label;
        message = item.invoice_info.message;
    } else if (type === 'REVIEW') {
        title = item.review_info.label;
        message = item.review_info.message;
    }
    
    return (
        <TouchableOpacity 
            className={cn('h-[100px] flex-row p-[10px] my-2 gap-[10px]', item.isRead ? 'opacity-40' : '')} 
            activeOpacity={item.isRead ? 0.4 : 1}
            onPress={props.onPress}
        >
            <View className='w-[80px] justify-center items-center rounded-full bg-slate-100'>
                {type === 'INVOICE' && (
                    <MaterialCommunityIcons name={'cart-outline'} size={30}/>
                )}
                {type === 'REVIEW' && (
                    <MaterialCommunityIcons name={'comment-edit-outline'} size={30}/>
                )}
            </View>
            <View className='flex-1'>
                <Text numberOfLines={1} className='text-lg uppercase font-TenorSans-Regular'>
                    {title}
                </Text>
                <Text className='text-base uppercase font-TenorSans-Regular'>
                    {dateString}
                </Text>
                <Text numberOfLines={2} className='text-base font-TenorSans-Regular text-slate-600'>
                    {message}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default NotifyItem;