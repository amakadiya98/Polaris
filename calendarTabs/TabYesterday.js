import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, Image, } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

export default function Tab({onChange,value,ranges,setSelectedDateLabel,setCompareDateRange,compareDateRange, setShowTabYesterday}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [startDateText, setStartDateText] = useState("");
    const [endDateText, setEndDateText] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState();

    useEffect(() => {
        console.log(selectedStartDate,'<-----compareStartDate');
        console.log(selectedEndDate,'<------compareEndDate');
        setStartDateText(formatDate(selectedStartDate));
        setEndDateText(formatDate(selectedEndDate));
        // Update date range whenever selectedStartDate or selectedEndDate changes
        if (selectedStartDate || selectedEndDate) {
            const range = {
                start: formatDate(selectedStartDate),
                end: formatDate(selectedEndDate)
            };
            setCompareDateRange(range);
            console.log(compareDateRange, '<-----compareDateRange')
        }
    }, [selectedStartDate, selectedEndDate]);

    const handleApply = () => {
        if (selectedStartDate && selectedEndDate) {
            const range = {
                start: selectedStartDate,
                end: selectedEndDate
            };
            setCompareDateRange(range);
            setShowTabYesterday(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectItem(item)}>
            <View style={styles.itemContent}>
                <Text style={styles.itemText}>{item.title}</Text>
                <RadioButton selected={selectedValue === item.alias} />
            </View>
        </TouchableOpacity>
    );

    const RadioButton = ({ selected }) => (
        <View style={[styles.radioIcon, { borderColor: selected ? 'black' : '#ccc' }]}>
            {selected && <View style={styles.radioInner} />}
        </View>
    );

    const handleSelectItem = (item) => {
        setSelectedValue(item.alias);
        setSelectedStartDate(item.period?.since);
        setStartDateText(formatDate(selectedStartDate))
        setSelectedEndDate(item.period?.until);
        setEndDateText(formatDate(selectedEndDate));
        setModalVisible(false);
    };

    const handleCancel = () =>{
        setShowTabYesterday(false);
        setModalVisible(false);
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const minDate = new Date(2000, 6, 6);
    const maxDate = new Date();

    const handleStartDateChange = (text) => {
        setStartDateText(text);
    }

    const handleEndDateChange = (text) => {
        setEndDateText(text);
    }

    const onDateChange = (date, type) => {
        if (type === "END_DATE") {
            setSelectedEndDate(date);
            setEndDateText(date ? formatDate(date) : "");
        } else {
            setSelectedStartDate(date);
            if (!selectedEndDate) {
                setSelectedEndDate(date);
                setEndDateText(date ? formatDate(date) : "");
            }
            setStartDateText(date ? formatDate(date) : "");
        }
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.customContainer}>
                <View style={styles.customView}>
                    <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
                        <Text style={styles.selectedText}>{selectedValue ? selectedValue : "Previous"}
                            </Text>
                            <Image
                               style={{width:18,height:18,padding:10}}
                               source={require('../assets/calender/11.png')}
                            />
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <FlatList
                                    // data={data}
                                    // renderItem={renderItem}
                                    // keyExtractor={(item) => item.value.toString()}
                                    data={ranges}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.alias.toString()}
                                />
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.dateContainer}>
                        <View style={[styles.inputView, styles.dateInputView]}>
                            <TextInput
                                style={[styles.input, styles.currentDateText]}
                                value={startDateText}
                                placeholder={currentDate}
                                placeholderTextColor="black"
                                onChangeText={handleStartDateChange}
                            />
                        </View>
                   

                        <FontAwesomeIcon icon={faArrowRight} style={{color:"gray", }} size={12} />

                        <View style={styles.inputView}>
                            <TextInput
                                style={[styles.input, styles.currentDateText]}
                                value={endDateText}
                                placeholder={currentDate}
                                placeholderTextColor="black"
                                onChangeText={handleEndDateChange}
                            />
                        </View>
                    </View>

                    <CalendarPicker
                        width={330}
                        height={350}
                        todayTextStyle={styles.todayTextStyle}
                        allowRangeSelection={true}
                        allowBackwardRangeSelect={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        firstDay={1}
                        textStyle={styles.textStyleall}
                        selectedDayTextStyle={styles.selectedDayStyle}
                        headerWrapperStyle={styles.customHeaderWrapper}

                        
                        // headerWrapperStyle={[styles.customHeaderWrapper, { height: 0 }]} 
                        previousComponent={<FontAwesomeIcon icon={faArrowLeft} style={{color:"gray"}} size={15}/>}
                        nextComponent={<FontAwesomeIcon icon={faArrowRight} style={{color:"gray"}} size={15}/>}
                        onDateChange={onDateChange}
                        selectedRangeStartTextStyle={styles.selectedRangeStartTextStyle}
                        selectedRangeEndTextStyle={styles.selectedRangeEndTextStyle}
                        selectedRangeStyle={styles.selectedRangeStyle}
                        selectedRangeStartStyle={styles.selectedRangeStartStyle}
                        selectedRangeEndStyle={styles.selectedRangeEndStyle}
                        dayLabelsWrapper={styles.weekLabel}
                        customDatesStyles={[
                            {
                                date: new Date(),
                                style: {
                                    backgroundColor: "transparent",
                                }
                            }
                        ]}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleApply}>
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    radioIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'black',
    },
    textStyleall: {
        fontWeight: "500",
    },
    todayTextStyle: {
        color: 'black',
    },
    selectedDayStyle: {
        fontWeight: "800",
        color: "black"
    },
    customHeaderWrapper: {
        paddingTop: 12,
        width:300
    },
    container: {
        flex: 1,
        backgroundColor: "transprent",
        marginTop: -75,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    customView: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },

    customContainer: {
        borderRadius: 15,
        elevation: 3,
        backgroundColor: "white",
    },
    dateContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-between",
    },
    input: {
        flex: 1,
        height: 38,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingLeft: 12,
        paddingRight: 5,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        width: 130,
        overflow: "scroll",
    },
    currentDateText: {
        fontSize: 16,
        fontWeight: "400",
        opacity: 1,
    },
    icon: {
        fontSize: 25,
        fontWeight: 800
    },
    pickerItem: {
        fontSize: 14,
    },
    picker: {
        height: 30,
    },
    datePicker: {
        borderWidth: 0.4,
        borderColor: "black",
        borderRadius: 10,
        height: 30
    }
    ,
    buttonContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 3,
        borderTopWidth: 0.2,
        borderColor: "grey"
    },
    button: {
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        paddingHorizontal: 7,
        paddingVertical: 4,

    },
    buttonText: {
        color: "black",
        fontSize: 14,
        fontWeight: "400",
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontWeight: "400"


    },
    selectedRangeEndTextStyle: {
        color: "white"
    },
    selectedRangeStartTextStyle: {
        color: "white"
    },
    selectedRangeStartStyle: {
        backgroundColor: 'black',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        width: 44,
        height: 36,
    },
    selectedRangeEndStyle: {
        backgroundColor: 'black',
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        width: 44,
        height: 36
    },
    selectedRangeStyle: {
        width: 44,
        height: 36,
        backgroundColor: "#EEEEEE",
    },
    selectedText: {
        fontWeight: "400",
        fontSize: 16
    },
    monthYearHeader: {
        fontWeight: "900"
    },
    pickerContainer: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth: 0.4,
        borderColor: "gray",
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 12,
        width: "100%",
    },
    centeredView: {
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: "90%",
        margin: 20,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    item: {
        padding: 16,
        borderBottomWidth: 0.2,
        borderBottomColor: "#ccc",
        width: "100%",
    },
    itemText: {
        fontSize: 22,
    },
    weekLabel: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingLeft: 25,
    },
});