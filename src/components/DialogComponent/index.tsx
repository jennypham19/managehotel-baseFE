import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, DialogProps } from '@mui/material';
import ActionButton from '@/components/ProButton/ActionButton';
import DialogContainer from '@/components/ProDialog/DialogContainer';
import DialogContent from '@/components/ProDialog/DialogContent';
import DialogFooter from '@/components/ProDialog/DialogFooter';
import DialogHeader from '@/components/ProDialog/DialogHeader';

interface Props extends Omit<DialogProps, 'open' | 'fullScreen'> {
  dialogKey: string | null | boolean;
  handleClose: () => void;
  children: ReactNode;
  dialogTitle?: string;
  dialogContentHeight?: string | number;
  showSaveButton?: boolean;
  customButtons?: ReactNode;
}

const DialogComponent = ({
  dialogKey,
  handleClose,
  children,
  dialogTitle,
  dialogContentHeight = 500,
  showSaveButton = false,
  customButtons,
  ...rest
}: Props) => {
  const { t } = useTranslation('common', { keyPrefix: 'actions' });
  return (
    <DialogContainer {...rest} open={!!dialogKey} onClose={handleClose}>
      <DialogHeader title={dialogTitle || ''} marginTop={2} />
      <DialogContent>
        <Box sx={{ height: dialogContentHeight, padding: 2 }}>{children}</Box>
      </DialogContent>
      <DialogFooter>
        <ActionButton actionType='cancel' onClick={handleClose}>
          {t('cancel')}
        </ActionButton>
        {customButtons}
      </DialogFooter>
    </DialogContainer>
  );
};

export default DialogComponent;
