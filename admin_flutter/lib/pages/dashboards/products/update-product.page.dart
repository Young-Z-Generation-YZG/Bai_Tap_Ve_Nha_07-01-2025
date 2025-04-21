import 'package:admin_flutter/pages/dashboards/products/products.page.dart';
import 'package:flutter/cupertino.dart';

class UpdateProductPage extends StatefulWidget {
  final Map<String, dynamic> product;

  const UpdateProductPage({super.key, required this.product});

  @override
  State<StatefulWidget> createState() => _UpdateProductPageState();
}

class _UpdateProductPageState extends State<UpdateProductPage> {
  double? _deviceWidth, _deviceHeight;

  // Form controllers
  late TextEditingController _nameController;
  late TextEditingController _priceController;
  late TextEditingController _stockController;
  late TextEditingController _descriptionController;
  late TextEditingController _brandController;
  late TextEditingController _emailController;
  late TextEditingController _addressController;
  late TextEditingController _noteController;

  // Selected values
  late String _selectedCategory;
  late String _selectedColor;
  late List<String> _selectedSizes;
  late String _selectedStatus;
  late bool _isActive;

  // Options for dropdowns
  final List<String> _categories = [
    'Casual',
    'Formal',
    'Maxi',
    'Tops',
    'Denim',
  ];
  final List<String> _colors = [
    'Black',
    'White',
    'Red',
    'Blue',
    'Yellow',
    'Green',
    'Purple',
    'Pink',
  ];
  final List<String> _sizes = ['XS', 'S', 'M', 'L'];
  final List<String> _statuses = ['PUBLISHED', 'DRAFT', 'SALE', 'OUT_OF_STOCK'];

  // Image URL from product
  late String _imageUrl;

  @override
  void initState() {
    super.initState();
    // Initialize controllers with product data
    _nameController = TextEditingController(text: widget.product['name'] ?? '');
    _priceController = TextEditingController(
      text: (widget.product['price']?.toString() ?? ''),
    );
    _stockController = TextEditingController(
      text: (widget.product['stock']?.toString() ?? ''),
    );
    _descriptionController = TextEditingController(
      text: widget.product['description'] ?? '',
    );
    _brandController = TextEditingController(
      text: widget.product['brand'] ?? '',
    );
    _emailController = TextEditingController(
      text: widget.product['email'] ?? '',
    );
    _addressController = TextEditingController(
      text: widget.product['address'] ?? '',
    );
    _noteController = TextEditingController(text: widget.product['note'] ?? '');

    // Initialize selected values
    _selectedCategory = widget.product['category'] ?? 'Casual';
    _selectedColor = widget.product['color'] ?? 'Black';
    _selectedSizes = List<String>.from(widget.product['size'] ?? ['M']);
    _selectedStatus = widget.product['status'] ?? 'PUBLISHED';
    _isActive = widget.product['isActive'] ?? true;

    // Initialize image URL
    _imageUrl = widget.product['imageUrl'] ?? 'https://via.placeholder.com/300';
  }

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Edit Product'),
        backgroundColor: CupertinoColors.systemGroupedBackground,
        border: null,
        leading: CupertinoNavigationBarBackButton(
          onPressed:
              () => Navigator.pushReplacement(
                context,
                CupertinoPageRoute(builder: (context) => ProductPage()),
              ),
        ),
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          child: Text(
            'Save',
            style: TextStyle(
              color: CupertinoColors.activeBlue,
              fontWeight: FontWeight.w600,
            ),
          ),
          onPressed: () {
            // Validate at least name is entered
            if (_nameController.text.isEmpty) {
              showCupertinoDialog(
                context: context,
                builder:
                    (context) => CupertinoAlertDialog(
                      title: Text('Missing Information'),
                      content: Text('Please enter a name for this product.'),
                      actions: [
                        CupertinoDialogAction(
                          child: Text('OK'),
                          onPressed: () => Navigator.pop(context),
                        ),
                      ],
                    ),
              );
              return;
            }

            // Create updated product object
            final product = {
              'id': widget.product['id'], // Preserve the original ID
              'name': _nameController.text,
              'category': _selectedCategory,
              'color': _selectedColor,
              'size': _selectedSizes,
              'price': double.tryParse(_priceController.text) ?? 0.0,
              'stock': int.tryParse(_stockController.text) ?? 0,
              'description': _descriptionController.text,
              'brand': _brandController.text,
              'isActive': _isActive,
              'email': _emailController.text,
              'address': _addressController.text,
              'note': _noteController.text,
              'imageUrl': _imageUrl,
            };

            // Return to previous screen with updated product
            Navigator.pop(context, product);
          },
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: ListView(
          children: [
            SizedBox(height: 20),
            // Profile Image Section
            Center(
              child: Column(
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      color: CupertinoColors.systemGrey5,
                      shape: BoxShape.circle,
                      image:
                          _imageUrl.isNotEmpty
                              ? DecorationImage(
                                image: NetworkImage(_imageUrl),
                                fit: BoxFit.cover,
                              )
                              : null,
                    ),
                    child:
                        _imageUrl.isEmpty
                            ? Icon(
                              CupertinoIcons.person_fill,
                              size: 50,
                              color: CupertinoColors.black,
                            )
                            : null,
                  ),
                  SizedBox(height: 8),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text(
                      'Edit',
                      style: TextStyle(color: CupertinoColors.activeBlue),
                    ),
                    onPressed: _showImageOptions,
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            // Main Info Group
            _buildFormGroup([
              _buildFormField('Product Name', _nameController),
              _buildSelectField('Category', _selectedCategory, _categories, (
                newValue,
              ) {
                setState(() {
                  _selectedCategory = newValue;
                });
              }),
              _buildSelectField('Color', _selectedColor, _colors, (newValue) {
                setState(() {
                  _selectedColor = newValue;
                });
              }),
              _buildMultiSelectField('Sizes', _selectedSizes, _sizes),
              _buildSelectField('Status', _selectedStatus, _statuses, (
                newValue,
              ) {
                setState(() {
                  _selectedStatus = newValue;
                });
              }),
              _buildFormField(
                'Price',
                _priceController,
                keyboardType: TextInputType.number,
              ),
              _buildFormField(
                'Stock',
                _stockController,
                keyboardType: TextInputType.number,
              ),
              _buildFormField(
                'Description',
                _descriptionController,
                maxLines: 3,
              ),
              _buildFormField('Brand', _brandController),
              _buildFormField(
                'Email',
                _emailController,
                keyboardType: TextInputType.emailAddress,
              ),
              _buildFormField('Address', _addressController),
              _buildSelectField(
                'Country',
                widget.product['country'] ?? 'United States',
                [
                  'United States',
                  'Canada',
                  'United Kingdom',
                  'Australia',
                  'Germany',
                  'France',
                  'Japan',
                  'China',
                  'India',
                  'Brazil',
                ],
                (newValue) {
                  setState(() {
                    // Add a country field to your state if needed
                    // _selectedCountry = newValue;
                  });
                },
              ),
              _buildSelectField(
                'Language',
                widget.product['language'] ?? 'English',
                [
                  'English',
                  'Spanish',
                  'French',
                  'German',
                  'Chinese',
                  'Japanese',
                  'Arabic',
                  'Russian',
                  'Portuguese',
                  'Hindi',
                ],
                (newValue) {
                  setState(() {
                    // Add a language field to your state if needed
                    // _selectedLanguage = newValue;
                  });
                },
              ),
              _buildStatusToggleField(_isActive, (newValue) {
                setState(() {
                  _isActive = newValue;
                });
              }),
            ]),
            SizedBox(height: 20),
            // Note Group
            _buildFormGroup([
              _buildFormField(
                'Note',
                _noteController,
                maxLines: 5,
                keyboardType: TextInputType.multiline,
              ),
            ]),
          ],
        ),
      ),
    );
  }

  Widget _buildFormGroup(List<Widget> children) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(children: children),
    );
  }

  Widget _buildFormField(
    String label,
    TextEditingController controller, {
    TextInputType keyboardType = TextInputType.text,
    int maxLines = 1,
  }) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: () {
        // Show bottom modal for editing
        _showEditModal(context, label, controller, keyboardType, maxLines);
      },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(color: CupertinoColors.systemGrey5, width: 0.5),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: TextStyle(
                color: CupertinoColors.black,
                fontSize: 17,
                fontWeight: FontWeight.normal,
              ),
            ),
            Row(
              children: [
                Text(
                  controller.text.isEmpty ? '' : controller.text,
                  style: TextStyle(
                    color: CupertinoColors.systemGrey,
                    fontSize: 17,
                  ),
                ),
                SizedBox(width: 8),
                Icon(
                  CupertinoIcons.chevron_right,
                  color: CupertinoColors.systemGrey3,
                  size: 18,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showEditModal(
    BuildContext context,
    String label,
    TextEditingController controller,
    TextInputType keyboardType,
    int maxLines,
  ) {
    // Create a temporary controller with the current value
    final tempController = TextEditingController(text: controller.text);

    showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: 300,
          padding: EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: CupertinoColors.systemBackground,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20),
              topRight: Radius.circular(20),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text('Cancel'),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                  Text(
                    label,
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text('Save'),
                    onPressed: () {
                      // Update the original controller
                      controller.text = tempController.text;
                      setState(() {});
                      Navigator.pop(context);
                    },
                  ),
                ],
              ),
              SizedBox(height: 16),
              Expanded(
                child: CupertinoTextField(
                  controller: tempController,
                  keyboardType: keyboardType,
                  maxLines: maxLines,
                  autofocus: true,
                  padding: EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    border: Border.all(color: CupertinoColors.systemGrey4),
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  void _showImageOptions() {
    showCupertinoModalPopup(
      context: context,
      builder:
          (BuildContext context) => CupertinoActionSheet(
            title: Text('Product Image'),
            actions: [
              CupertinoActionSheetAction(
                child: Text('Take Photo'),
                onPressed: () {
                  // Implement camera image capture
                  Navigator.pop(context);
                },
              ),
              CupertinoActionSheetAction(
                child: Text('Choose from Library'),
                onPressed: () {
                  // Implement photo library selection
                  Navigator.pop(context);
                },
              ),
            ],
            cancelButton: CupertinoActionSheetAction(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ),
    );
  }

  Widget _buildSelectField(
    String label,
    String selectedValue,
    List<String> options,
    Function(String) onChanged,
  ) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: () {
        _showSelectionModal(context, label, selectedValue, options, onChanged);
      },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(color: CupertinoColors.systemGrey5, width: 0.5),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: TextStyle(
                color: CupertinoColors.black,
                fontSize: 17,
                fontWeight: FontWeight.normal,
              ),
            ),
            Row(
              children: [
                Text(
                  selectedValue,
                  style: TextStyle(color: CupertinoColors.black, fontSize: 17),
                ),
                SizedBox(width: 8),
                Icon(
                  CupertinoIcons.chevron_down,
                  color: CupertinoColors.systemGrey3,
                  size: 18,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showSelectionModal(
    BuildContext context,
    String label,
    String currentValue,
    List<String> options,
    Function(String) onChanged,
  ) {
    // Track the temporary selection
    String tempSelection = currentValue;

    showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: 250,
          padding: EdgeInsets.only(top: 6.0),
          margin: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
          ),
          color: CupertinoColors.systemBackground,
          child: SafeArea(
            top: false,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    CupertinoButton(
                      child: Text('Cancel'),
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                    CupertinoButton(
                      child: Text('Done'),
                      onPressed: () {
                        onChanged(tempSelection);
                        Navigator.of(context).pop();
                      },
                    ),
                  ],
                ),
                Expanded(
                  child: CupertinoPicker(
                    scrollController: FixedExtentScrollController(
                      initialItem: options.indexOf(currentValue),
                    ),
                    magnification: 1.22,
                    squeeze: 1.2,
                    useMagnifier: true,
                    itemExtent: 32.0,
                    onSelectedItemChanged: (int selectedItem) {
                      tempSelection = options[selectedItem];
                    },
                    children: List<Widget>.generate(options.length, (
                      int index,
                    ) {
                      return Center(
                        child: Text(
                          options[index],
                          style: TextStyle(fontSize: 16),
                        ),
                      );
                    }),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildMultiSelectField(
    String label,
    List<String> selectedValues,
    List<String> options,
  ) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: () {
        _showMultiSelectionModal(context, label, selectedValues, options);
      },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(color: CupertinoColors.systemGrey5, width: 0.5),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: TextStyle(
                color: CupertinoColors.black,
                fontSize: 17,
                fontWeight: FontWeight.normal,
              ),
            ),
            Expanded(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  // Show chips for selected values
                  if (selectedValues.isNotEmpty)
                    Expanded(
                      child: SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children:
                              selectedValues.map((value) {
                                return Padding(
                                  padding: const EdgeInsets.only(left: 4),
                                  child: Container(
                                    padding: EdgeInsets.symmetric(
                                      horizontal: 10,
                                      vertical: 4,
                                    ),
                                    decoration: BoxDecoration(
                                      color: CupertinoColors.systemGrey5,
                                      borderRadius: BorderRadius.circular(16),
                                    ),
                                    child: Text(
                                      value,
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: CupertinoColors.black,
                                      ),
                                    ),
                                  ),
                                );
                              }).toList(),
                        ),
                      ),
                    ),
                  SizedBox(width: 8),
                  Icon(
                    CupertinoIcons.chevron_right,
                    color: CupertinoColors.systemGrey3,
                    size: 18,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showMultiSelectionModal(
    BuildContext context,
    String label,
    List<String> selectedValues,
    List<String> options,
  ) {
    // Create a copy of the current selections to modify
    List<String> tempSelections = List.from(selectedValues);

    showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: 400,
          padding: EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: CupertinoColors.systemBackground,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20),
              topRight: Radius.circular(20),
            ),
          ),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text('Cancel'),
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                  ),
                  Text(
                    'Select $label',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text('Done'),
                    onPressed: () {
                      setState(() {
                        selectedValues.clear();
                        selectedValues.addAll(tempSelections);
                      });
                      Navigator.of(context).pop();
                    },
                  ),
                ],
              ),
              SizedBox(height: 16),
              Expanded(
                child: StatefulBuilder(
                  builder: (BuildContext context, StateSetter setModalState) {
                    return CupertinoScrollbar(
                      child: ListView.builder(
                        itemCount: options.length,
                        itemBuilder: (context, index) {
                          final option = options[index];
                          final isSelected = tempSelections.contains(option);

                          return CupertinoButton(
                            padding: EdgeInsets.zero,
                            onPressed: () {
                              setModalState(() {
                                if (isSelected) {
                                  tempSelections.remove(option);
                                } else {
                                  tempSelections.add(option);
                                }
                              });
                            },
                            child: Container(
                              padding: EdgeInsets.symmetric(
                                vertical: 12,
                                horizontal: 16,
                              ),
                              decoration: BoxDecoration(
                                border: Border(
                                  bottom: BorderSide(
                                    color: CupertinoColors.systemGrey5,
                                    width: 0.5,
                                  ),
                                ),
                              ),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    option,
                                    style: TextStyle(
                                      color: CupertinoColors.black,
                                      fontSize: 16,
                                    ),
                                  ),
                                  if (isSelected)
                                    Icon(
                                      CupertinoIcons.check_mark,
                                      color: CupertinoColors.activeBlue,
                                    ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildStatusToggleField(bool value, Function(bool) onChanged) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: CupertinoColors.systemGrey5, width: 0.5),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Status',
            style: TextStyle(
              color: CupertinoColors.black,
              fontSize: 17,
              fontWeight: FontWeight.normal,
            ),
          ),
          Row(
            children: [
              // Optionally show the current status text
              Text(
                value ? 'Active' : 'Inactive',
                style: TextStyle(
                  color: CupertinoColors.systemGrey,
                  fontSize: 15,
                ),
              ),
              SizedBox(width: 8),
              CupertinoSwitch(
                value: value,
                activeColor: CupertinoColors.activeBlue,
                onChanged: (newValue) {
                  onChanged(newValue);
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _priceController.dispose();
    _stockController.dispose();
    _descriptionController.dispose();
    _brandController.dispose();
    _emailController.dispose();
    _addressController.dispose();
    _noteController.dispose();
    super.dispose();
  }
}
