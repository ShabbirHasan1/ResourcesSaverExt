import React, { useMemo, useContext } from 'react';
import { withTheme } from 'styled-components';
import { HeaderWrapper } from './styles';
import ResetButton from 'app/components/ResetButton';
import Button from 'app/components/Button';
import { StoreContext } from 'app/store';
import { resolveDuplicatedResources } from 'app/utils/file';
import { INITIAL_STATE as UI_INITIAL_STATE } from 'app/store/ui';

export const Header = props => {
  const { onSave } = props;
  const { state } = useContext(StoreContext);
  const {
    ui: { status, isSaving },
  } = state;
  const handleOnSave = useMemo(
    () => () => {
      const { networkResource, staticResource } = state;
      if ((networkResource && networkResource.length) || (staticResource && staticResource.length)) {
        onSave && onSave(resolveDuplicatedResources([...(staticResource || []), ...(networkResource || [])]));
      }
    },
    [onSave, state]
  );
  return (
    <HeaderWrapper>
      <div>
        <span>Resources Saver</span>
        <sup>Version: 2.0.0</sup>
        <ResetButton color={props.theme.white} bgColor={props.theme.danger} />
      </div>
      <Button onClick={handleOnSave} disabled={status !== UI_INITIAL_STATE.status || isSaving}>
        {isSaving ? `Saving all resource...` : `Save All Resources`}
      </Button>
    </HeaderWrapper>
  );
};

export default withTheme(Header);