import * as React from 'react';
import { AnchorHTMLAttributes, memo, FC } from 'react';
import get from 'lodash/get';
import { sanitizeFieldRestProps } from './sanitizeFieldRestProps';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useRecordContext, useTranslate } from 'ra-core';
import { PublicFieldProps, InjectedFieldProps, fieldPropTypes } from './types';

export const UrlField: FC<UrlFieldProps> = memo(props => {
    const { className, emptyText, source, ...rest } = props;
    const record = useRecordContext(props);
    const value = get(record, source);
    const translate = useTranslate();

    if (value == null) {
        return (
            <Typography
                component="span"
                variant="body2"
                className={className}
                {...sanitizeFieldRestProps(rest)}
            >
                {emptyText && translate(emptyText, { _: emptyText })}
            </Typography>
        );
    }

    return (
        <Link
            className={className}
            href={value}
            onClick={stopPropagation}
            variant="body2"
            {...sanitizeFieldRestProps(rest)}
        >
            {value}
        </Link>
    );
});

UrlField.propTypes = fieldPropTypes;
UrlField.displayName = 'UrlField';

export interface UrlFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        AnchorHTMLAttributes<HTMLAnchorElement> {}

// useful to prevent click bubbling in a Datagrid with rowClick
const stopPropagation = e => e.stopPropagation();
