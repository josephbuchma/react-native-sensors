import { NativeModules, DeviceEventEmitter } from "react-native";
const {
	Gyroscope: GyroNative,
	Accelerometer: AccNative,
	Magnetometer: MagnNative,
	Barometer: BarNative
} = NativeModules;

if (!GyroNative && !AccNative && !MagnNative && !BarNative) {
	throw new Error(
		"Native modules for sensors not available. Did react-native link run successfully?"
	);
}

const handle = {
	Accelerometer: AccNative,
	Gyroscope: GyroNative,
	Magnetometer: MagnNative,
	Barometer: BarNative
};

const RNSensors = {
	start: function(type, updateInterval) {
		const api = handle[type];
		api.setUpdateInterval(updateInterval);
		api.startUpdates();
	},

	isAvailable: function(type) {
		const api = handle[type];
		return api.isAvailable();
	},

	setUpdateInterval: function(type, interval) {
		const api = handle[type];
		return api.setUpdateInterval(interval);
	},

	stop: function(type) {
		const api = handle[type];
		api.stopUpdates();
	}
};

export default RNSensors;
