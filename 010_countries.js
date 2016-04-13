/*exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('countries').del(),
	knex('genders').countries([
    // Inserts seed entries
 knex('countries').insert({name: 'Afghanistan'}),
 knex('countries').insert({name: 'Åland Islands'}),
 knex('countries').insert({name: 'Albania'}),
 knex('countries').insert({name: 'Algeria'}),
 knex('countries').insert({name: 'American Samoa'}),
 knex('countries').insert({name: 'Andorra'}),
 knex('countries').insert({name: 'Angola'}),
 knex('countries').insert({name: 'Anguilla'}),
 knex('countries').insert({name: 'Antarctica'}),
 knex('countries').insert({name: 'Antigua and Barbuda'}),
 knex('countries').insert({name: 'Argentina'}),
 knex('countries').insert({name: 'Armenia'}),
 knex('countries').insert({name: 'Aruba'}),
 knex('countries').insert({name: 'Australia'}),
 knex('countries').insert({name: 'Austria'}),
 knex('countries').insert({name: 'Azerbaijan'}),
 knex('countries').insert({name: 'Bahamas'}),
 knex('countries').insert({name: 'Bahrain'}),
 knex('countries').insert({name: 'Bangladesh'}),
 knex('countries').insert({name: 'Barbados'}),
 knex('countries').insert({name: 'Belarus'}),
 knex('countries').insert({name: 'Belgium'}),
 knex('countries').insert({name: 'Belize'}),
 knex('countries').insert({name: 'Benin'}),
 knex('countries').insert({name: 'Bermuda'}),
 knex('countries').insert({name: 'Bhutan'}),
 knex('countries').insert({name: 'Bolivia, Plurinational State of'}),
 knex('countries').insert({name: 'Bonaire, Sint Eustatius and Saba'}),
 knex('countries').insert({name: 'Bosnia and Herzegovina'}),
 knex('countries').insert({name: 'Botswana'}),
 knex('countries').insert({name: 'Bouvet Island'}),
 knex('countries').insert({name: 'Brazil'}),
 knex('countries').insert({name: 'British Indian Ocean Territory'}),
 knex('countries').insert({name: 'Brunei Darussalam'}),
 knex('countries').insert({name: 'Bulgaria'}),
 knex('countries').insert({name: 'Burkina Faso'}),
 knex('countries').insert({name: 'Burundi'}),
 knex('countries').insert({name: 'Cambodia'}),
 knex('countries').insert({name: 'Cameroon'}),
 knex('countries').insert({name: 'Canada'}),
 knex('countries').insert({name: 'Cape Verde'}),
 knex('countries').insert({name: 'Cayman Islands'}),
 knex('countries').insert({name: 'Central African Republic'}),
 knex('countries').insert({name: 'Chad'}),
 knex('countries').insert({name: 'Chile'}),
 knex('countries').insert({name: 'China'}),
 knex('countries').insert({name: 'Christmas Island'}),
 knex('countries').insert({name: 'Cocos (Keeling) Islands'}),
 knex('countries').insert({name: 'Colombia'}),
 knex('countries').insert({name: 'Comoros'}),
 knex('countries').insert({name: 'Congo'}),
 knex('countries').insert({name: 'Congo, the Democratic Republic of the'}),
 knex('countries').insert({name: 'Cook Islands'}),
 knex('countries').insert({name: 'Costa Rica'}),
 knex('countries').insert({name: 'Côte d`Ivoire'}),
 knex('countries').insert({name: 'Croatia'}),
 knex('countries').insert({name: 'Cuba'}),
 knex('countries').insert({name: 'Curaçao'}),
 knex('countries').insert({name: 'Cyprus'}),
 knex('countries').insert({name: 'Czech Republic'}),
 knex('countries').insert({name: 'Denmark'}),
 knex('countries').insert({name: 'Djibouti'}),
 knex('countries').insert({name: 'Dominica'}),
 knex('countries').insert({name: 'Dominican Republic'}),
 knex('countries').insert({name: 'Ecuador'}),
 knex('countries').insert({name: 'Egypt'}),
 knex('countries').insert({name: 'El Salvador'}),
 knex('countries').insert({name: 'Equatorial Guinea'}),
 knex('countries').insert({name: 'Eritrea'}),
 knex('countries').insert({name: 'Estonia'}),
 knex('countries').insert({name: 'Ethiopia'}),
 knex('countries').insert({name: 'Falkland Islands (Malvinas)'}),
 knex('countries').insert({name: 'Faroe Islands'}),
 knex('countries').insert({name: 'Fiji'}),
 knex('countries').insert({name: 'Finland'}),
 knex('countries').insert({name: 'France'}),
 knex('countries').insert({name: 'French Guiana'}),
 knex('countries').insert({name: 'French Polynesia'}),
 knex('countries').insert({name: 'French Southern Territories'}),
 knex('countries').insert({name: 'Gabon'}),
 knex('countries').insert({name: 'Gambia'}),
 knex('countries').insert({name: 'Georgia'}),
 knex('countries').insert({name: 'Germany'}),
 knex('countries').insert({name: 'Ghana'}),
 knex('countries').insert({name: 'Gibraltar'}),
 knex('countries').insert({name: 'Greece'}),
 knex('countries').insert({name: 'Greenland'}),
 knex('countries').insert({name: 'Grenada'}),
 knex('countries').insert({name: 'Guadeloupe'}),
 knex('countries').insert({name: 'Guam'}),
 knex('countries').insert({name: 'Guatemala'}),
 knex('countries').insert({name: 'Guernsey'}),
 knex('countries').insert({name: 'Guinea'}),
 knex('countries').insert({name: 'Guinea-Bissau'}),
 knex('countries').insert({name: 'Guyana'}),
 knex('countries').insert({name: 'Haiti'}),
 knex('countries').insert({name: 'Heard Island and McDonald Islands'}),
 knex('countries').insert({name: 'Holy See (Vatican City State)'}),
 knex('countries').insert({name: 'Honduras'}),
 knex('countries').insert({name: 'Hong Kong'}),
 knex('countries').insert({name: 'Hungary'}),
 knex('countries').insert({name: 'Iceland'}),
 knex('countries').insert({name: 'India'}),
 knex('countries').insert({name: 'Indonesia'}),
 knex('countries').insert({name: 'Iran, Islamic Republic of'}),
 knex('countries').insert({name: 'Iraq'}),
 knex('countries').insert({name: 'Ireland'}),
 knex('countries').insert({name: 'Isle of Man'}),
 knex('countries').insert({name: 'Israel'}),
 knex('countries').insert({name: 'Italy'}),
 knex('countries').insert({name: 'Jamaica'}),
 knex('countries').insert({name: 'Japan'}),
 knex('countries').insert({name: 'Jersey'}),
 knex('countries').insert({name: 'Jordan'}),
 knex('countries').insert({name: 'Kazakhstan'}),
 knex('countries').insert({name: 'Kenya'}),
 knex('countries').insert({name: 'Kiribati'}),
 knex('countries').insert({name: "Korea, Democratic People's Republic of"}),
 knex('countries').insert({name: 'Korea, Republic of'}),
 knex('countries').insert({name: 'Kuwait'}),
 knex('countries').insert({name: 'Kyrgyzstan'}),
 knex('countries').insert({name: "Lao People's Democratic Republic"}),
 knex('countries').insert({name: 'Latvia'}),
 knex('countries').insert({name: 'Lebanon'}),
 knex('countries').insert({name: 'Lesotho'}),
 knex('countries').insert({name: 'Liberia'}),
 knex('countries').insert({name: 'Libya'}),
 knex('countries').insert({name: 'Liechtenstein'}),
 knex('countries').insert({name: 'Lithuania'}),
 knex('countries').insert({name: 'Luxembourg'}),
 knex('countries').insert({name: 'Macao'}),
 knex('countries').insert({name: 'Macedonia, the former Yugoslav Republic of'}),
 knex('countries').insert({name: 'Madagascar'}),
 knex('countries').insert({name: 'Malawi'}),
 knex('countries').insert({name: 'Malaysia'}),
 knex('countries').insert({name: 'Maldives'}),
 knex('countries').insert({name: 'Mali'}),
 knex('countries').insert({name: 'Malta'}),
 knex('countries').insert({name: 'Marshall Islands'}),
 knex('countries').insert({name: 'Martinique'}),
 knex('countries').insert({name: 'Mauritania'}),
 knex('countries').insert({name: 'Mauritius'}),
 knex('countries').insert({name: 'Mayotte'}),
 knex('countries').insert({name: 'Mexico'}),
 knex('countries').insert({name: 'Micronesia, Federated States of'}),
 knex('countries').insert({name: 'Moldova, Republic of'}),
 knex('countries').insert({name: 'Monaco'}),
 knex('countries').insert({name: 'Mongolia'}),
 knex('countries').insert({name: 'Montenegro'}),
 knex('countries').insert({name: 'Montserrat'}),
 knex('countries').insert({name: 'Morocco'}),
 knex('countries').insert({name: 'Mozambique'}),
 knex('countries').insert({name: 'Myanmar'}),
 knex('countries').insert({name: 'Namibia'}),
 knex('countries').insert({name: 'Nauru'}),
 knex('countries').insert({name: 'Nepal'}),
 knex('countries').insert({name: 'Netherlands'}),
 knex('countries').insert({name: 'New Caledonia'}),
 knex('countries').insert({name: 'New Zealand'}),
 knex('countries').insert({name: 'Nicaragua'}),
 knex('countries').insert({name: 'Niger'}),
 knex('countries').insert({name: 'Nigeria'}),
 knex('countries').insert({name: 'Niue'}),
 knex('countries').insert({name: 'Norfolk Island'}),
 knex('countries').insert({name: 'Northern Mariana Islands'}),
 knex('countries').insert({name: 'Norway'}),
 knex('countries').insert({name: 'Oman'}),
 knex('countries').insert({name: 'Pakistan'}),
 knex('countries').insert({name: 'Palau'}),
 knex('countries').insert({name: 'Palestinian Territory, Occupied'}),
 knex('countries').insert({name: 'Panama'}),
 knex('countries').insert({name: 'Papua New Guinea'}),
 knex('countries').insert({name: 'Paraguay'}),
 knex('countries').insert({name: 'Peru'}),
 knex('countries').insert({name: 'Philippines'}),
 knex('countries').insert({name: 'Pitcairn'}),
 knex('countries').insert({name: 'Poland'}),
 knex('countries').insert({name: 'Portugal'}),
 knex('countries').insert({name: 'Puerto Rico'}),
 knex('countries').insert({name: 'Qatar'}),
 knex('countries').insert({name: 'Réunion'}),
 knex('countries').insert({name: 'Romania'}),
 knex('countries').insert({name: 'Russian Federation'}),
 knex('countries').insert({name: 'Rwanda'}),
 knex('countries').insert({name: 'Saint Barthélemy'}),
 knex('countries').insert({name: 'Saint Helena, Ascension and Tristan da Cunha'}),
 knex('countries').insert({name: 'Saint Kitts and Nevis'}),
 knex('countries').insert({name: 'Saint Lucia'}),
 knex('countries').insert({name: 'Saint Martin (French part)'}),
 knex('countries').insert({name: 'Saint Pierre and Miquelon'}),
 knex('countries').insert({name: 'Saint Vincent and the Grenadines'}),
 knex('countries').insert({name: 'Samoa'}),
 knex('countries').insert({name: 'San Marino'}),
 knex('countries').insert({name: 'Sao Tome and Principe'}),
 knex('countries').insert({name: 'Saudi Arabia'}),
 knex('countries').insert({name: 'Senegal'}),
 knex('countries').insert({name: 'Serbia'}),
 knex('countries').insert({name: 'Seychelles'}),
 knex('countries').insert({name: 'Sierra Leone'}),
 knex('countries').insert({name: 'Singapore'}),
 knex('countries').insert({name: 'Sint Maarten (Dutch part)'}),
 knex('countries').insert({name: 'Slovakia'}),
 knex('countries').insert({name: 'Slovenia'}),
 knex('countries').insert({name: 'Solomon Islands'}),
 knex('countries').insert({name: 'Somalia'}),
 knex('countries').insert({name: 'South Africa'}),
 knex('countries').insert({name: 'South Georgia and the South Sandwich Islands'}),
 knex('countries').insert({name: 'South Sudan'}),
 knex('countries').insert({name: 'Spain'}),
 knex('countries').insert({name: 'Sri Lanka'}),
 knex('countries').insert({name: 'Sudan'}),
 knex('countries').insert({name: 'Suriname'}),
 knex('countries').insert({name: 'Svalbard and Jan Mayen'}),
 knex('countries').insert({name: 'Swaziland'}),
 knex('countries').insert({name: 'Sweden'}),
 knex('countries').insert({name: 'Switzerland'}),
 knex('countries').insert({name: 'Syrian Arab Republic'}),
 knex('countries').insert({name: 'Taiwan, Province of China'}),
 knex('countries').insert({name: 'Tajikistan'}),
 knex('countries').insert({name: 'Tanzania, United Republic of'}),
 knex('countries').insert({name: 'Thailand'}),
 knex('countries').insert({name: 'Timor-Leste'}),
 knex('countries').insert({name: 'Togo'}),
 knex('countries').insert({name: 'Tokelau'}),
 knex('countries').insert({name: 'Tonga'}),
 knex('countries').insert({name: 'Trinidad and Tobago'}),
 knex('countries').insert({name: 'Tunisia'}),
 knex('countries').insert({name: 'Turkey'}),
 knex('countries').insert({name: 'Turkmenistan'}),
 knex('countries').insert({name: 'Turks and Caicos Islands'}),
 knex('countries').insert({name: 'Tuvalu'}),
 knex('countries').insert({name: 'Uganda'}),
 knex('countries').insert({name: 'Ukraine'}),
 knex('countries').insert({name: 'United Arab Emirates'}),
 knex('countries').insert({name: 'United Kingdom'}),
 knex('countries').insert({name: 'United States'}),
 knex('countries').insert({name: 'United States Minor Outlying Islands'}),
 knex('countries').insert({name: 'Uruguay'}),
 knex('countries').insert({name: 'Uzbekistan'}),
 knex('countries').insert({name: 'Vanuatu'}),
 knex('countries').insert({name: 'Venezuela, Bolivarian Republic of'}),
 knex('countries').insert({name: 'Viet Nam'}),
 knex('countries').insert({name: 'Virgin Islands, British'}),
 knex('countries').insert({name: 'Virgin Islands, U.S.'}),
 knex('countries').insert({name: 'Wallis and Futuna'}),
 knex('countries').insert({name: 'Western Sahara'}),
 knex('countries').insert({name: 'Yemen'}),
 knex('countries').insert({name: 'Zambia'}),
 knex('countries').insert({name: 'Zimbabwe'})
  ]);
};
*/