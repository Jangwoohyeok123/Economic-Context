import clsx from 'clsx';
import Menu from '@/components/menu/Menu';
import styles from './Dashboard.module.scss';
import DashHeader from '@/components/dashheader/DashHeader';
import { useState } from 'react';
import MyContextTab from '@/components/myContext/MyContext';
import IndicatorsTab from '@/components/indicatorsTab/IndicatorsTab';
import { roboto, poppins } from '../_app';
import JournalToolbar from '@/components/journalsSection/journalToolbar/JournalToolbar';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import JournalForm from '@/components/journalsSection/journalForm/JournalForm';
import { ContextNameWithKey_Type } from '@/types/context';
interface JournalFormSection_Props {
	$isRight: boolean;
}
const JournalToolbarSection = styled.div`
	position: fixed;
	bottom: 100px;
	right: 3%;
	z-index: 10;
`;
const JournalFormSection = styled.div<JournalFormSection_Props>`
	position: fixed;
	max-width: calc(100% - var(--dashMenuWidth));
	${props =>
		props.$isRight
			? `
		width: 40%;
		height: 100%;
		right: 0;
	`
			: `
			width:75%;
	left: calc(var(--dashMenuWidth) + 2%);
	`}
	bottom: 0;
	z-index: 10;
`;

export default function Dashboard() {
	const [selectedTab, setSelectedTab] = useState<string>('Indicators');
	const [currentContext, setCurrentContext] = useState<ContextNameWithKey_Type>({ id: 0, name: '' });
	const [isJournalOpen, setIsJournalOpen] = useState(false);
	const [isRight, setIsRight] = useState(false);

	return (
		<>
			<section className={clsx(styles.Dashboard, roboto.variable, poppins.variable)} style={{ position: 'relative' }}>
				<Menu selectedTab={selectedTab} setSelectedTab={setSelectedTab} setCurrentContext={setCurrentContext} />

				<section style={{ position: 'relative' }}>
					<DashHeader selectedTab={selectedTab} />

					{selectedTab === 'Indicators' ? (
						<IndicatorsTab />
					) : (
						<>
							<MyContextTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
							<AnimatePresence>
								{isJournalOpen && (
									<JournalFormSection $isRight={isRight}>
										<JournalForm
											currentContext={currentContext}
											isRight={isRight}
											isJournalOpen={isJournalOpen}
											setIsJournalOpen={setIsJournalOpen}
										/>
									</JournalFormSection>
								)}
							</AnimatePresence>
							<JournalToolbarSection>
								<JournalToolbar isRight={isRight} setIsRight={setIsRight} isJournalOpen={isJournalOpen} setIsJournalOpen={setIsJournalOpen} />
							</JournalToolbarSection>
						</>
					)}
				</section>
			</section>
		</>
	);
}
