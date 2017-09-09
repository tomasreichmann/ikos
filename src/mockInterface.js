import {serverUrl, menu} from './config.json';
console.log('menu', menu);
export default {
	['GET:' + menu[0].children[0].dataUrl]: {
		success: {
            "componentProps": {
                "groups": [
                    [
                        {
                            "label": "Sériové číslo",
                            "value": "123456SAD"
                        },
                        {
                            "label": "Licencováno pro",
                            "value": "IKOS CZ s.r.o."
                        }
                    ],
                    [
                        {
                            "label": "Hardware ver.",
                            "value": "1.0"
                        },
                        {
                            "label": "Firmware ver.",
                            "value": "1.1"
                        },
                        {
                            "label": "Web ver.",
                            "value": "1.2"
                        }
                    ],
                    [
                        {
                            "label": "Doba běhu terminálu",
                            "value": "up 1 day, 55 minutes"
                        },
                        {
                            "label": "Aktuální čas",
                            "value": "09.09.2017 19:29:33"
                        }
                    ]
                ]
            }
        },
		fail: {
			errorCode: 404,
			errorMessage: 'Požadovaná data nejsou k dispozici.'
		}
	},
	['GET:' + menu[0].children[1].dataUrl]: {
		success: {
			componentProps: {
                headings: [
                    'typ',
                    'datum',
                    'čas',
                    'událost'
                ],
				groups: [
                   [
                       {
                           "value": [
                               'info',
                               '01.09.2017',
                               '07:57:27',
                               'Spuštění terminálu IT-WATT'
                           ]
                       },
                       {
                            "value": [
                                'info',
                                '01.09.2017',
                                '07:57:27',
                                'Spuštění terminálu IT-WATT'
                            ]
                        },
                       {
                            "value": [
                                'info',
                                '01.09.2017',
                                '07:57:27',
                                'Spuštění terminálu IT-WATT'
                            ]
                        },
                       {
                            "value": [
                                'info',
                                '01.09.2017',
                                '07:57:27',
                                'Spuštění terminálu IT-WATT sa dsad asd asd '
                            ]
                        },
                       {
                            "value": [
                                'info',
                                '01.09.2017',
                                '07:57:27',
                                'Spuštění'
                            ]
                        },
                   ] 
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
