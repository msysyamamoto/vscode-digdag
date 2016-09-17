'use strict';

import {CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position, Range} from 'vscode';

export class DigdagAutocomplete implements CompletionItemProvider {

	private keywords = [
		"!include :",
		"_background:",
		"_check:",
		"_command:",
		"_do:",
		"_error:",
		"_export:",
		"_parallel:",
		"_retry:",
		"_type:",
		"alert:",
		"duration:",
		"fail:",
		"schedule:",
		"sla:",
		"time:",
	];

	private variables = [
		"timezone",
		"session_uuid",
		"session_time",
		"session_date",
		"session_date_compact",
		"session_local_time",
		"session_tz_offset",
		"session_unixtime",
		"last_session_time",
		"last_session_date",
		"last_session_date_compact",
		"last_session_local_time",
		"last_session_tz_offset",
		"last_session_unixtime",
		"next_session_time",
		"next_session_date",
		"next_session_date_compact",
		"next_session_local_time",
		"next_session_tz_offset",
		"next_session_unixtime",
	]

    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {

		var range = document.getWordRangeAtPosition(position);
		var prefix = range ? document.getText(range) : '';
		var result = this.makeProposals(prefix, this.keywords, CompletionItemKind.Keyword)
			.concat(this.makeProposals(prefix, this.variables, CompletionItemKind.Variable));

		return Promise.resolve(result);
	}

	makeProposals(prefix: string, labels:string[], kind:CompletionItemKind): CompletionItem[] {
		return labels.filter((label) => {
			return prefix.length === 0
				|| (label.length >= prefix.length && label.substr(0, prefix.length) === prefix);
		}).map((label) => {
			var item = new CompletionItem(label);
			item.kind = kind;
			return item;
		});
	}
}
