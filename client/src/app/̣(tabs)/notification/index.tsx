import {
   Dimensions,
   Modal,
   ScrollView, 
   Text,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import NotifyItem from '@components/ui/NotifyItem';
import {
   MaterialCommunityIcons, AntDesign
} from '@expo/vector-icons';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import { InvoiceNotificationType, NotificationType } from '~/src/infrastructure/types/notification.type';
import { format } from 'date-fns';
import { router } from 'expo-router';

const {height: SCREENHEIGHT, width: SCREENWIDTH} = Dimensions.get('screen')
const NotificationScreen = () => {
   const { userId } = useAppSelector(state => state.auth)
   const notification = useAppSelector(state => state.notification)
   const [isNotificationModal, setNotificationModal] = useState(false)
   const [typeModal, setTypeModal] = useState('')
   const [invoiceInfo, setInvoiceInfo] = useState({label: '', createAt: '', message: '', invoice: '', amount: 0, status: ''})
   const [reviewInfo, setReviewInfo] = useState({label: '', createAt: '', message: '', invoice: '', product:'', content: '', rating: 0})

   useEffect(() => {
      if (!userId){
         router.replace({ pathname: "sign-in", params: { prevScreen:  'notification' } });
      }
   },[userId])

   // console.log('[NotificationScreen]::items::', notification.items)
   // console.log('[NotificationScreen]::total::', notification.total)
   // console.log('[NotificationScreen]::unreadCount::', notification.unreadCount)

   const onShowModal = (item: NotificationType) => {
      if (item.type === 'INVOICE'){
         setInvoiceInfo({
            label: item.invoice_info.label,
            createAt: format(new Date(item.createdAt?item.createdAt:''), 'dd/MM/yyyy'),
            message: item.invoice_info.message,
            invoice: item.invoice_info.invoice_id,
            amount: item.invoice_info.amount,
            status: item.invoice_info.status,
         })
      }
      if (item.type === 'REVIEW'){
         setReviewInfo({
            label: item.review_info.label, 
            createAt: format(new Date(item.createdAt?item.createdAt:''), 'dd/MM/yyyy'),
            message: item.review_info.message, 
            invoice: item.review_info.invoice_code, 
            product:item.review_info.product_name, 
            content: item.review_info.content, 
            rating: item.review_info.rating,
         })
      }
      setTypeModal(item.type)
      setNotificationModal(true)
   }

   const renderModalContent = () => {
      switch(typeModal) {
         case 'INVOICE':
            return (
               <View className="w-[390px] p-5 bg-white rounded-lg gap-3">
                  <View className='items-center'>
                     <View className='h-20 w-20 rounded-full bg-slate-100 justify-center items-center'>
                        <MaterialCommunityIcons name={'cart-outline'} size={30}/>
                     </View>
                  </View>
                  <View className='flex-row'>
                     <Text numberOfLines={2} className='w-full text-center uppercase font-TenorSans-Regular text-2xl'>{invoiceInfo.label}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Date: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{invoiceInfo.createAt}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Message: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{invoiceInfo.message}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Invoice: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{invoiceInfo.invoice}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Amount: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{invoiceInfo.amount}$</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Status: </Text>
                     <View className='w-[100px] border rounded-lg justify-center items-center'>
                        <Text className="font-TenorSans-Regular text-[11px]">{invoiceInfo.status}</Text>
                     </View>
                  </View>
                  <View className='flex-row'>
                     <TouchableOpacity className='bg-black flex-1 py-3 items-center rounded-lg'>
                        <Text className='text-lg text-white uppercase font-TenorSans-Regular'>CHECK INVOICE</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            );
         case 'REVIEW':
            return (
               <View className="w-[390px] p-5 bg-white rounded-lg gap-3">
                  <View className='items-center'>
                     <View className='h-20 w-20 rounded-full bg-slate-100 justify-center items-center'>
                        <MaterialCommunityIcons name={'comment-edit-outline'} size={30}/>
                     </View>
                  </View>
                  <View className='flex-row'>
                     <Text numberOfLines={2} className='w-full text-center uppercase font-TenorSans-Regular text-2xl'>{reviewInfo.label}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Date: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{reviewInfo.createAt}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Message: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{reviewInfo.message}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Invoice: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{reviewInfo.invoice}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Product: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%] uppercase'>{reviewInfo.product}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Content: </Text>
                     <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{reviewInfo.content}</Text>
                  </View>
                  <View className='flex-row'>
                     <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Rating: </Text>
                     <View className='basis-[78%] flex-row items-center'>
                        <Text className='font-TenorSans-Regular text-lg'>{reviewInfo.rating}</Text>
                        <AntDesign name="star" size={18} color={'#FFB22C'}/>
                     </View>
                  </View>
               </View>
            );
         // case 'VOUCHER':
         //    return (
         //       <View className="w-[390px] p-5 bg-white rounded-lg gap-3">
         //          <View className='items-center'>
         //             <View className='h-20 w-20 rounded-full bg-slate-100 justify-center items-center'>
         //                <MaterialCommunityIcons name={'comment-edit-outline'} size={30}/>
         //             </View>
         //          </View>
         //          <View className='flex-row'>
         //             <Text numberOfLines={2} className='w-full text-center uppercase font-TenorSans-Regular text-2xl'>{voucherInfo.label}</Text>
         //          </View>
         //          <View className='flex-row'>
         //             <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Date: </Text>
         //             <Text className='font-TenorSans-Regular text-lg basis-[78%]'>28/04/2025</Text>
         //          </View>
         //          <View className='flex-row'>
         //             <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Message: </Text>
         //             <Text className='font-TenorSans-Regular text-lg basis-[78%]'>{voucherInfo.message}</Text>
         //          </View>
         //          <View className='flex-row'>
         //             <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Invoice: </Text>
         //             <Text className='font-TenorSans-Regular text-lg basis-[78%]'>680bba28fd1932cca1e48f73</Text>
         //          </View>
         //          <View className='flex-row'>
         //             <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Voucher: </Text>
         //             <Text className='font-TenorSans-Regular text-lg basis-[78%] uppercase'>REV-F17F996F</Text>
         //          </View>
         //          <View className='flex-row'>
         //             <Text className='font-TenorSans-Regular text-lg basis-[22%]'>Discount: </Text>
         //             <Text className='font-TenorSans-Regular text-lg basis-[78%]'>10%</Text>
         //          </View>
         //          <View className='flex-row'>
         //             <Text className='font-TenorSans-Regular text-lg basis-[32%]'>Max discount: </Text>
         //             <Text className='font-TenorSans-Regular text-lg basis-[68%]'>1000$</Text>
         //          </View>
         //          <View className='flex-row'>
         //             <TouchableOpacity className='bg-black flex-1 py-3 items-center rounded-lg'>
         //                <Text className='text-lg text-white uppercase font-TenorSans-Regular'>CHECK YOUR VOUCHERS</Text>
         //             </TouchableOpacity>
         //          </View>
         //       </View>
         //    );
         // default:
         //    return (
         //       <View className="w-[390px] h-[500px] p-5 bg-white rounded-lg gap-3">
         //          <Text>No details available</Text>
         //       </View>
         //    );
      }
   };

   return (
      <View className='flex-1 bg-white px-[10px]'>
         <View className='py-2 items-center'>
            <Text className='text-2xl mb-2 tracking-[5px] uppercase font-TenorSans-Regular'>Notifications</Text>
         </View>
         <View className='flex-1'> 
            <FlatList
               showsVerticalScrollIndicator={false}
               data={notification.items}
               // keyExtractor={({}) => }
               renderItem={({item, index}) => (
                  <View>
                     <NotifyItem 
                        item={item}
                        onPress={() => {onShowModal(item)}}
                     />
                     {
                        index !== arrNotifications.length - 1 &&
                        <View className='h-[1px] bg-slate-200'/>
                     }
                  </View>
               )}
            />
         </View>
         <Modal
            animationType="fade"
            transparent={true}
            visible={isNotificationModal}
            onRequestClose={() => setNotificationModal(false)}
         >
            <TouchableWithoutFeedback onPress={() => setNotificationModal(false)}>
               <View className="w-[100%] h-[100%] bg-[#000000ab] flex justify-center items-center">
                  <TouchableWithoutFeedback onPress={() => {}}>
                     {renderModalContent()}
                  </TouchableWithoutFeedback>
               </View>
            </TouchableWithoutFeedback>
         </Modal>
      </View>
   );
};

export default NotificationScreen;

const arrNotifications: Array<{
   _id: string;
   type: 'INVOICE' | 'REVIEW' | 'VOUCHER';
   label: string;
   message: string;
   isRead: boolean;
}> = [
   {
      _id: '#0001',
      type: 'INVOICE',
      label: 'new order created',
      message: 'invoice for order #321413 of user #67ef97148a53ddabeb422b6e',
      isRead: true,
   }, 
   {
      _id: '#0002',
      type: 'REVIEW',
      label: 'new review created',
      message: 'This dress is beautiful',
      isRead: false,
   }, 
   {
      _id: '#0003',
      type: 'VOUCHER',
      label: 'new voucher created',
      message: 'voucher from invoice of user #67ef97148a53ddabeb422b6e',
      isRead: true,
   }, 
   {
      _id: '#0004',
      type: 'INVOICE',
      label: 'new order created',
      message: 'invoice for order #321413 of user #67ef97148a53ddabeb422b6e',
      isRead: false,
   },
   {
      _id: '#0001',
      type: 'INVOICE',
      label: 'new order created',
      message: 'invoice for order #321413 of user #67ef97148a53ddabeb422b6e',
      isRead: true,
   }, 
   {
      _id: '#0002',
      type: 'REVIEW',
      label: 'new review created',
      message: 'This dress is beautiful',
      isRead: false,
   }, 
   {
      _id: '#0003',
      type: 'VOUCHER',
      label: 'new voucher created',
      message: 'voucher from invoice of user #67ef97148a53ddabeb422b6e',
      isRead: true,
   }, 
   {
      _id: '#0004',
      type: 'INVOICE',
      label: 'new order created',
      message: 'invoice for order #321413 of user #67ef97148a53ddabeb422b6e',
      isRead: false,
   }, 
];