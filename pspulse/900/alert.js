/* Copyright (C) 2023-2025 anonymous

This file is part of PSFree.

PSFree is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

PSFree is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>. */

function formatError(reason, event) {
    var value = reason || (event && event.message) || 'Unknown error';
    var source = (reason && reason.sourceURL) || (event && event.filename) || '';
    var line = (reason && reason.line) || (event && event.lineno) || '';
    var column = (reason && reason.column) || (event && event.colno) || '';
    var stack = (reason && reason.stack) || '';
    return String(value) + '\n' + source + ':' + line + ':' + column + (stack ? '\n' + stack : '');
}

addEventListener('unhandledrejection', function (event) {
    alert('Unhandled rejection\n' + formatError(event.reason, event));
});

addEventListener('error', function (event) {
    alert('Unhandled error\n' + formatError(event.error, event));
    return true;
});

// The host page completes firmware detection before deferred modules execute.
if (window.ps4FirmwareSupported === true) {
    import('./psfree.js');
}
