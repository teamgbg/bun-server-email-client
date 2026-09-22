/**
 * @system email
 * @status handwritten
 * @edit directly
 *
 * Configurable-primitive entry for the email-client. The bootloader injects the
 * scala-email-sender base URL + the internal API key from the `email-client`
 * config row at boot (configured-primitives) — no process.env read, no hardcoded
 * default (service-ports-from-registry). Resolution is read lazily at send time
 * so the boot-time configure() always runs before the first use.
 */
let _baseURL: string | undefined;
let _internalApiKey: string | undefined;

export function configure(opts: {
	emailConfig?: { baseURL?: string };
	internalApiKey?: string;
}): void {
	const baseURL = opts.emailConfig?.baseURL;
	if (baseURL !== undefined) _baseURL = baseURL;
	if (opts.internalApiKey !== undefined) _internalApiKey = opts.internalApiKey;
}

export function getEmailSenderBaseUrl(): string {
	if (!_baseURL) {
		throw new Error(
			"email-client baseURL is not configured — the 'email-client' configurable_primitive must inject it from config/email-client (configured-primitives)",
		);
	}
	return _baseURL;
}

/** The internal API key for x-scala-internal-key auth (bootloader-injected). Undefined when not injected. */
export function getInternalApiKey(): string | undefined {
	return _internalApiKey;
}
