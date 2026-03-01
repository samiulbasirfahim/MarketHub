import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export function createStackNavigator<T extends ParamListBase>() {
    return createNativeStackNavigator<T>();
}

export function craeteTabNavigator<T extends ParamListBase>() {
    return createMaterialTopTabNavigator<T>();
}
