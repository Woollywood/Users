function FieldWrapper({ title, children }) {
	return (
		<div className='flex flex-col'>
			<h2 className='text-4xl mb-4 uppercase'>{title}</h2>
			<div>{children}</div>
		</div>
	);
}

function Field({ title, value }) {
	return (
		<div className='text-lg'>
			<span className='font-medium'>{title}</span>: {value}
		</div>
	);
}

export default function Profile({ user }) {
	const { company, crypto } = user;
	const fullName = `${user.firstName} ${user.lastName}`;

	return (
		<div className='space-y-12'>
			<div className='flex items-center gap-4'>
				<img src={user.image} alt='avatar' />
				<div>
					<h2 className='text-4xl font-medium mb-2'>
						{fullName} ({user.username})
					</h2>
					<p className='text-xl text-gray-400'>{user.email}</p>
				</div>
			</div>
			<FieldWrapper title='Bio'>
				<Field title='First Name' value={user.firstName} />
				<Field title='Last Name' value={user.lastName} />
				<Field title='Phone' value={user.phone} />
				<Field title='University' value={user.university} />
			</FieldWrapper>
			<FieldWrapper title='Company'>
				<Field title='Address' value={company.address.address} />
				<Field title='City' value={company.address.city} />
				<Field title='Country' value={company.address.country} />
				<Field title='Postal Code' value={company.address.postalCode} />
				<Field title='State' value={company.address.state} />
				<Field title='State Code' value={company.address.stateCode} />
				<Field title='Department' value={company.department} />
				<Field title='Name' value={company.name} />
				<Field title='Title' value={company.title} />
			</FieldWrapper>
			<FieldWrapper title='Crypto'>
				<Field title='Coin' value={crypto.coin} />
				<Field title='Network' value={crypto.network} />
				<Field title='Wallet' value={crypto.wallet} />
			</FieldWrapper>
		</div>
	);
}
