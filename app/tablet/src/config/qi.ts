const allowedVersion = [
	"Chrome/44.0.2403.157", // Pepper 1.8a
	"Chrome/39.0.2171.71", // Pepper 1.6
];

/**
 * If you want to test pepper's browser compatibility
 */
const forceRemote = false;

/**
 * If Javascript is running on Pepper or on a local Browser
 */
export const runningOnPepper = forceRemote || allowedVersion.some((v) => window.navigator.userAgent.includes(v));

export const pepperIp = "10.42.0.217";
