'use strict';

import {CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position} from 'vscode';

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
		"call>:",
		"require>:",
		"loop>:",
		"for_each>:",
		"for_range>:",
		"if>:",
		"fail>:",
		"echo>:",
		"td>:",
		"td_run>:",
		"td_ddl>:",
		"td_load>:",
		"td_for_each>:",
		"td_wait>:",
		"td_wait_table>:",
		"td_partial_delete>:",
		"td_table_export>:",
		"pg>:",
		"mail>:",
		"http>:",
		"s3_wait>:",
		"redshift>:",
		"redshift_load>:",
		"redshift_unload>:",
		"emr>:",
		"gcs_wait>:",
		"bq>:",
		"bq_ddl>:",
		"bq_extract>:",
		"bq_load>:",
		"sh>:",
		"py>:",
		"rb>:",
		"embulk>:",
		"daily>:",
		"hourly>:",
		"weekly>:",
		"monthly>:",
		"minutes_interval>:",
		"cron>:",
		"skip_on_overtime:",
	];

	private variables = [
		"timezone",
		"session_uuid",
		"session_id",
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
		"last_executed_session_time",
		"last_executed_session_date",
		"last_executed_session_date_compact",
		"last_executed_session_local_time",
		"last_executed_session_tz_offset",
		"last_executed_session_unixtime",
		"task_name",
	]

    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {

		const range = document.getWordRangeAtPosition(position);
		const prefix = range ? document.getText(range) : '';
		const result = this.makeProposals(prefix, this.keywords, CompletionItemKind.Keyword)
			.concat(this.makeProposals(prefix, this.variables, CompletionItemKind.Variable));

		return Promise.resolve(result);
	}

	makeProposals(prefix: string, labels:string[], kind:CompletionItemKind): CompletionItem[] {
		const prefixLength = prefix.length
		return labels.filter((label) => {
			return prefixLength === 0
				|| (label.length >= prefixLength && label.substr(0, prefixLength) === prefix);
		}).map((label) => {
			const item = new CompletionItem(label);
			item.kind = kind;
			return item;
		});
	}
}
