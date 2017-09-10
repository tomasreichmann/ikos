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
			componentProps: [
                {
                    children: '[Stáhnout](index.html)',
                    makeLinksIntoButtons: true,
                    linksDownload: true,
                },
                {
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
            ]
		},
		fail: {
			errorCode: 404,
			errorMessage: 'Požadovaná data nejsou k dispozici.'
		}
	},
	['GET:' + menu[0].children[2].dataUrl]: {
		success: {
			componentProps: {
                headings: [
                    'datum',
                    'čas',
                    'počítač',
                    'událost'
                ],
				groups: [
                   [
                       {
                           "value": [
                                '01.09.2017',
                                '07:58:31',
                                '10.0.0.72',
                                'Přihlášení uživatele "admin"'
                           ]
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
	['GET:' + menu[0].children[3].dataUrl]: {
		success: {
			componentProps: {
                headings: [
                    'Aktuální datum a čas v terminálu 10.09.2017 10:16:51',
                ],
				groups: [
                   [
                       {
                           "value": [
                                '01.09.2017',
                                '07:58:31',
                                '10.0.0.72',
                                'Přihlášení uživatele "admin"'
                           ]
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
    ['GET:' + menu[1].children[0].dataUrl]: {
		success: {
			componentProps: {
                updateUrl: "http://localhost:3000/system/keys-update",
                formProps: {
                    formElements: [
                        {
                            label: "Název",
                            name: "name",
                            type: "text",
                            value: ""
                        }, {
                            label: "Kód",
                            name: "code",
                            type: "number",
                            min: 0,
                            value: 0
                        }, { // TODO: color picker
                            label: "Barva",
                            name: "color",
                            type: "text",
                            value: "000000"
                        }, {
                            label: "Strana",
                            name: "page",
                            type: "number",
                            min: 0,
                            max: 3,
                            value: 0
                        }, {
                            label: "Pozice na straně",
                            name: "position",
                            type: "number",
                            min: 0,
                            max: 7,
                            value: 0
                        }, {
                            label: "Obrázek",
                            name: "image",
                            type: "text",
                            value: "info"
                        }, {
                            label: "Režim tlačítka",
                            name: "mode",
                            type: "select",
                            options: [
                                {label: 0, value: 0}
                            ],
                            value: 0
                        }, {
                            label: "Sepnutí relé1 při známé kartě",
                            name: "knownCardRelay1",
                            type: "checkbox",
                            value: true
                        }, {
                            label: "Sepnutí relé1 při neznámé kartě",
                            name: "unknownCardRelay1",
                            type: "checkbox",
                            value: true
                        }, {
                            label: "Zobrazit název tlačítka",
                            name: "displayName",
                            type: "checkbox",
                            value: true
                        }
                    ]
                },
                keys: [
                    {
                        name: "Autodestrukce",
                        code: 0,
                        color: 'D02020',
                        page: 3,
                        position: 7,
                        image: 'danger',
                        mode: 0,
                        knownCardRelay1: true,
                        unknownCardRelay1: true,
                        displayName: true
                    },
                    {
                        name: "Hyperpohon",
                        code: 1,
                        color: '4020D0',
                        page: 0,
                        position: 0,
                        image: 'primary',
                        mode: 0,
                        knownCardRelay1: false,
                        unknownCardRelay1: false,
                        displayName: false
                    }
                ]
			}
		},
		fail: {
			errorCode: 404,
			errorMessage: 'Požadovaná data nejsou k dispozici.'
		}
    },
    ['POST:' + 'http://localhost:3000/system/keys-update']: {
        success: {
		},
		fail: {
			errorCode: 401,
			invalidElements: [],
			errorMessage: 'Formulář se nepodařilo odeslat.'
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
