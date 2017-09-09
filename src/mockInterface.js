import {serverUrl} from './config.json';

export default {
	['GET:' + serverUrl + '/general/info']: {
		success: {
			componentProps: {
				groups: [
					[
						{ label: 'Sériové číslo', value: 123564 },
						{ label: 'Licencováno pro', value: 'IKOS test' },
					],
					[
						{ label: 'Sériové číslo', value: 123564 },
						{ label: 'Licencováno pro', value: 'IKOS test' },
					]
				]
			}
		},
		fail: {
			errorCode: 404,
			errorMessage: 'Požadovaná data nejsou k dispozici.'
		}
	},
	['GET:' + serverUrl + '/system/network-connections']: {
		success: {
			componentProps: {
				updateUrl: serverUrl + '/system/network-connections',
				formElements: [
					{ label: 'DHCP', name: 'dhcp', componentName: 'Checkbox', value: true },
					{ label: 'IP adresa', name: 'i_p_address', componentName: 'Input', pattern: '((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$', value: '192.168.0.100' },
					{ label: 'Maska podsítě', name: 'subnet_mask', componentName: 'Input', pattern: '((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$', value: '255.255.255.0' },
					{ label: 'Výchozí brána', name: 'default_gate', componentName: 'Input', pattern: '((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$', value: '192.168.0.1' },
					{ label: 'DNS server', name: 'dns_server', componentName: 'Input', pattern: '((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$', value: '192.168.0.2' },
				]
			}
		},
		fail: {
			errorCode: 404,
			errorMessage: 'Požadovaná data nejsou k dispozici.'
		}
	},
	['POST:' + serverUrl + '/system/network-connections']: {
		success: {
		},
		fail: {
			errorCode: 401,
			invalidElements: [ 'default_gate', 'dns_server'],
			errorMessage: 'Formulář obsahuje neplatné položky.'
		}
	},
	['POST:' + serverUrl + '/system/password-update']: {
		success: {
		},
		fail: {
			errorCode: 401,
			invalidElements: [ 'new_password', 'new_password_repeat'],
			errorMessage: 'Heslo obsahuje neplatné znaky.'
		}
	},
};
